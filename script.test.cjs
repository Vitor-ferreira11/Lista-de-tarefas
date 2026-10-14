const { test } = require('node:test');
const assert = require('node:assert/strict');
const vm = require('node:vm');
const fs = require('node:fs');
function iniciar(dados, bloqueado = false) {
    function elemento() {
        return { children: [], value: '', events: {}, appendChild(child) { this.children.push(child); },
            setAttribute() {}, addEventListener(name, fn) { this.events[name] = fn; },
            set innerHTML(value) { this.children = []; } };
    }
    const lista = elemento(), input = elemento(), button = elemento();
    let salvo, avisos = [];
    vm.runInNewContext(fs.readFileSync(__dirname + '/script.js', 'utf8'), {
        document: { querySelector: s => s.endsWith('ul') ? lista : s.endsWith('input') ? input : button,
            createElement: elemento, createTextNode: text => ({ text }) },
        localStorage: { getItem() { if (bloqueado) throw Error(); return dados; },
            setItem(key, value) { if (bloqueado) throw Error(); salvo = value; } },
        alert: msg => avisos.push(msg)
    });
    return { lista, input, button, get salvo() { return salvo; }, avisos };
}
test('exclui a segunda tarefa repetida preservando a primeira', () => {
    const app = iniciar('["igual","outra","igual"]');
    app.lista.children[2].children[1].events.click();
    assert.deepEqual(JSON.parse(app.salvo), ['igual', 'outra']);
});
test('dados inválidos não impedem adicionar por Enter', () => {
    for (const dados of ['{', '{}', 'null', '123']) {
        const app = iniciar(dados);
        app.input.value = '  estudar  ';
        app.input.events.keydown({ key: 'Enter' });
        assert.deepEqual(JSON.parse(app.salvo), ['estudar']);
    }
});
test('rejeita espaços e suporta armazenamento bloqueado', () => {
    const app = iniciar(null, true);
    app.input.value = '   ';
    app.button.onclick();
    assert.equal(app.lista.children.length, 0);
    app.input.value = 'estudar';
    app.button.onclick();
    assert.equal(app.lista.children.length, 1);
    assert.equal(app.avisos.length, 2);
});
