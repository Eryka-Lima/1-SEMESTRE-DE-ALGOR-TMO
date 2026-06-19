let alunos = [];

// ===================== INCLUIR =====================
function incluir() {

    let ra = Number(document.formNotas.ra.value);
    let nota = Number(document.formNotas.nota.value);

    if (ra < 2000 || ra > 3000) {
        alert("R.A deve estar entre 2000 e 3000");
        return;
    }

    if (nota < 0 || nota > 10) {
        alert("Nota deve estar entre 0 e 10");
        return;
    }

    alunos.push([ra, nota]);

    mostrarTela1();
}

// ===================== EXCLUIR =====================
function excluir() {

    let ra = Number(document.formNotas.ra.value);

    let achou = false;

    for (let i = 0; i < alunos.length; i++) {
        if (alunos[i][0] === ra) {
            alunos.splice(i, 1);
            achou = true;
            break;
        }
    }

    if (!achou) alert("R.A não encontrado");

    mostrarTela1();
}

// ===================== ALTERAR =====================
function alterar() {

    let ra = Number(document.formNotas.ra.value);
    let novaNota = Number(document.formNotas.novaNota.value);

    if (novaNota < 0 || novaNota > 10) {
        alert("Nota inválida");
        return;
    }

    let achou = false;

    for (let i = 0; i < alunos.length; i++) {
        if (alunos[i][0] === ra) {
            alunos[i][1] = novaNota;
            achou = true;
            break;
        }
    }

    if (!achou) alert("R.A não encontrado");

    mostrarTela1();
}

// ===================== MOSTRAR TELA 1 =====================
function mostrarTela1() {

    let texto = "";

    for (let i = alunos.length - 1; i >= 0; i--) {
        texto += "R.A: " + alunos[i][0] + " | Nota: " + alunos[i][1] + "<br>";
    }

    document.getElementById("saida1").innerHTML = texto;
}

// ===================== CONSULTA =====================
function consultar() {

    let de = Number(document.formConsulta.de.value);
    let ate = Number(document.formConsulta.ate.value);

    if (de > ate) {
        alert("Intervalo inválido");
        return;
    }

    let texto = "";
    let achou = false;

    for (let i = 0; i < alunos.length; i++) {

        if (alunos[i][0] >= de && alunos[i][0] <= ate) {
            texto += alunos[i][0] + " - " + alunos[i][1] + "<br>";
            achou = true;
        }
    }

    if (!achou) {
        alert("Nenhum registro encontrado");
        return;
    }

    texto += "<br>Resumo Final: " + alunos.length + " alunos";

    document.getElementById("saida2").innerHTML = texto;
}

// ===================== AJUSTE =====================
function ajustar() {

    let de = Number(document.formAjuste.de.value);
    let ate = Number(document.formAjuste.ate.value);

    if (de > ate) {
        alert("Intervalo inválido");
        return;
    }

    let tipo = document.formAjuste.tipo.value;

    let pontos = Number(document.formAjuste.pontos.value);
    let percent = Number(document.formAjuste.percent.value);

    let valor;
    let usarPercent = false;

    if (pontos >= 0.5 && pontos <= 1.5) {
        valor = pontos;
    } else if (percent >= 3 && percent <= 13) {
        valor = percent;
        usarPercent = true;
    } else {
        valor = Math.floor(Math.random() * 11) + 5;
        usarPercent = true;
    }

    for (let i = 0; i < alunos.length; i++) {

        if (alunos[i][0] >= de && alunos[i][0] <= ate) {

            if (tipo === "bonus") {

                if (usarPercent)
                    alunos[i][1] += alunos[i][1] * (valor / 100);
                else
                    alunos[i][1] += valor;

            } else {

                if (usarPercent)
                    alunos[i][1] -= alunos[i][1] * (valor / 100);
                else
                    alunos[i][1] -= valor;
            }

            if (alunos[i][1] > 10) alunos[i][1] = 10;
            if (alunos[i][1] < 0) alunos[i][1] = 0;
        }
    }

    mostrarTela3();
}

// ===================== MOSTRAR AJUSTE =====================
function mostrarTela3() {

    let texto = "";

    for (let i = alunos.length - 1; i >= 0; i--) {
        texto += alunos[i][0] + " - " + alunos[i][1] + "<br>";
    }

    document.getElementById("saida3").innerHTML = texto;
}

// ===================== TROCA DE TELAS =====================
function irConsulta() {

    document.getElementById("tela1").style.display = "none";
    document.getElementById("tela2").style.display = "block";
}

function irAjuste() {

    document.getElementById("tela1").style.display = "none";
    document.getElementById("tela3").style.display = "block";
}

function voltar() {

    document.getElementById("tela2").style.display = "none";
    document.getElementById("tela3").style.display = "none";
    document.getElementById("tela1").style.display = "block";
}