const API_URL = "http://localhost:3000";

let token = localStorage.getItem("token");

// Alternar entre login e registro
document.getElementById("show-register")?.addEventListener("click", (e) => {
    e.preventDefault();
    document.getElementById("login-form").style.display = "none";
    document.getElementById("register-form").style.display = "block";
});

document.getElementById("show-login")?.addEventListener("click", (e) => {
    e.preventDefault();
    document.getElementById("register-form").style.display = "none";
    document.getElementById("login-form").style.display = "block";
});

// Registrar um novo usuário
document.getElementById("register")?.addEventListener("submit", async (e) => {
    e.preventDefault();
    const email = document.getElementById("register-email").value;
    const password = document.getElementById("register-password").value;

    try {
        const response = await fetch(`${API_URL}/auth/register`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
        });

        const data = await response.json();
        if (response.ok) {
            alert("Usuário registrado com sucesso!");
            document.getElementById("register-form").style.display = "none";
            document.getElementById("login-form").style.display = "block";
        } else {
            alert(data.message);
        }
    } catch (err) {
        alert("Erro ao registrar usuário.");
    }
});

// Fazer login
document.getElementById("login")?.addEventListener("submit", async (e) => {
    e.preventDefault();
    const email = document.getElementById("login-email").value;
    const password = document.getElementById("login-password").value;

    try {
        const response = await fetch(`${API_URL}/auth/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
        });

        const data = await response.json();
        if (response.ok) {
            localStorage.setItem("token", data.token);
            window.location.href = "agendamentos.html";
        } else {
            alert(data.message);
        }
    } catch (err) {
        alert("Erro ao fazer login.");
    }
});

// Logout
document.getElementById("logout")?.addEventListener("click", () => {
    localStorage.removeItem("token");
    window.location.href = "index.html";
});

// Criar um novo agendamento
document.getElementById("create-schedule")?.addEventListener("submit", async (e) => {
    e.preventDefault();
    const empresa = document.getElementById("empresa").value;
    const nome = document.getElementById("nome").value;
    const dataNasc = document.getElementById("dataNasc").value;
    const dataAgn = document.getElementById("dataAgn").value;
    const cpf = document.getElementById("cpf").value;
    const sexo = document.getElementById("sexo").value;
    const setor = document.getElementById("setor").value;
    const cargo = document.getElementById("cargo").value;
    const matriculaEsocial = document.getElementById("matriculaEsocial").value;

    try {
        const response = await fetch(`${API_URL}/schedules`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
            body: JSON.stringify({ empresa, nome, dataNasc, dataAgn, CPF: cpf, sexo, setor, cargo, matriculaEsocial }),
        });

        const data = await response.json();
        if (response.ok) {
            alert("Agendamento criado com sucesso!");
            window.location.reload();
        } else {
            alert(data.message);
        }
    } catch (err) {
        alert("Erro ao criar agendamento.");
    }
});

// Listar agendamentos
async function loadSchedules() {
    try {
        const response = await fetch(`${API_URL}/schedules`, {
            headers: { "Authorization": `Bearer ${token}` },
        });

        const data = await response.json();
        if (response.ok) {
            const schedulesList = document.getElementById("schedules-list");
            schedulesList.innerHTML = data.map(schedule => `
                <li>
                    <strong>${schedule.nome}</strong> - ${schedule.empresa} (${schedule.dataAgn})
                </li>
            `).join("");
        } else {
            alert(data.message);
        }
    } catch (err) {
        alert("Erro ao carregar agendamentos.");
    }
}

// Carregar agendamentos ao abrir a página
if (window.location.pathname.endsWith("agendamentos.html")) {
    if (!token) {
        window.location.href = "index.html";
    } else {
        loadSchedules();
    }
}