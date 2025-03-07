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
    const nomeEmpresa = document.getElementById("register-nome-empresa").value; // Novo campo

    try {
        const response = await fetch(`${API_URL}/auth/register`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password, nomeEmpresa }), // Enviando nomeEmpresa
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

async function loadUserData() {
    try {
        const response = await fetch(`${API_URL}/auth/me`, {
            headers: { "Authorization": `Bearer ${token}` },
        });

        if (!response.ok) {
            throw new Error("Erro ao carregar dados do usuário.");
        }

        const user = await response.json();
        console.log("Dados do usuário:", user); // Log dos dados do usuário

        // Preenche o campo "empresa"
        document.getElementById("empresa").value = user.nomeEmpresa;
        console.log("Campo empresa preenchido com:", user.nomeEmpresa); // Log do valor do campo
    } catch (err) {
        console.error(err);
        alert("Erro ao carregar dados do usuário.");
    }
}

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
    const tipoExame = document.getElementById("tipoExame").value; // Novo campo
    const matriculaEsocial = document.getElementById("matriculaEsocial").value;

    console.log("Dados enviados:", { empresa, nome, dataNasc, dataAgn, cpf, sexo, setor, cargo, tipoExame, matriculaEsocial }); // Log dos dados

    try {
        const response = await fetch(`${API_URL}/schedules`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
            body: JSON.stringify({
                empresa,
                nome,
                dataNasc,
                dataAgn,
                CPF: cpf,
                sexo,
                setor,
                cargo,
                tipoExame, // Novo campo
                matriculaEsocial,
            }),
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
        loadUserData(); // Carrega os dados do usuário
        loadSchedules();
    }
}

// Função para carregar exames
async function loadExames() {
    try {
        const response = await fetch(`${API_URL}/admin/exames`, {
            headers: { "Authorization": `Bearer ${token}` },
        });

        const exames = await response.json();
        const examesList = document.getElementById("exames-list"); // ID "exames-list"
        const examesSelect = document.getElementById("exames-select"); // ID "exames-select"

        examesList.innerHTML = exames.map(exame => `
            <li>${exame.nome}</li>
        `).join("");

        examesSelect.innerHTML = exames.map(exame => `
            <option value="${exame._id}">${exame.nome}</option>
        `).join("");
    } catch (err) {
        console.error(err);
        alert("Erro ao carregar exames.");
    }
}

// Função para carregar empresas
async function loadEmpresas() {
    try {
        const response = await fetch(`${API_URL}/admin/empresas`, {
            headers: { "Authorization": `Bearer ${token}` },
        });

        if (!response.ok) {
            throw new Error("Erro ao carregar empresas.");
        }

        const empresas = await response.json();
        const empresaSelect = document.getElementById("empresa-select");

        empresaSelect.innerHTML = empresas.map(empresa => `
            <option value="${empresa._id}">${empresa.nomeEmpresa}</option>
        `).join("");
    } catch (err) {
        console.error(err);
        alert("Erro ao carregar empresas.");
    }
}

// Criar novo exame
document.getElementById("create-exame")?.addEventListener("submit", async (e) => {
    e.preventDefault();
    const nome = document.getElementById("exame-nome").value;

    try {
        const response = await fetch(`${API_URL}/admin/exames`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
            body: JSON.stringify({ nome }),
        });

        const data = await response.json();
        if (response.ok) {
            alert("Exame criado com sucesso!");
            loadExames();
        } else {
            alert(data.message);
        }
    } catch (err) {
        alert("Erro ao criar exame.");
    }
});

// Associar exames à empresa
document.getElementById("assign-exames")?.addEventListener("submit", async (e) => {
    e.preventDefault();
    const empresaId = document.getElementById("empresa-select").value;
    const exames = Array.from(document.getElementById("exames-select").selectedOptions).map(option => option.value);

    try {
        const response = await fetch(`${API_URL}/admin/empresas/${empresaId}/exames`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
            body: JSON.stringify({ exames }),
        });

        const data = await response.json();
        if (response.ok) {
            alert("Exames associados com sucesso!");
        } else {
            alert(data.message);
        }
    } catch (err) {
        alert("Erro ao associar exames.");
    }
});

// Carregar exames e empresas ao abrir a página
if (window.location.pathname.endsWith("admin.html")) {
    if (!token) {
        window.location.href = "index.html";
    } else {
        loadExames();
        loadEmpresas();
    }
}

// Função para carregar setores
async function loadSetores(empresaId) {
    try {
        const response = await fetch(`${API_URL}/admin/empresas/${empresaId}/setores`, {
            headers: { "Authorization": `Bearer ${token}` },
        });

        const setores = await response.json();
        const setoresList = document.getElementById("setores-list");
        const setorSelect = document.getElementById("setor-select");
        const setorSelectExames = document.getElementById("setor-select-exames");

        setoresList.innerHTML = setores.map(setor => `
            <li>${setor.nome} - Cargos: ${setor.cargos.join(", ")}</li>
        `).join("");

        setorSelect.innerHTML = setores.map(setor => `
            <option value="${setor._id}">${setor.nome}</option>
        `).join("");

        setorSelectExames.innerHTML = setores.map(setor => `
            <option value="${setor._id}">${setor.nome}</option>
        `).join("");
    } catch (err) {
        console.error(err);
        alert("Erro ao carregar setores.");
    }
}

// Criar novo setor
document.getElementById("create-setor")?.addEventListener("submit", async (e) => {
    e.preventDefault();
    const empresaId = document.getElementById("empresa-select").value;
    const nome = document.getElementById("setor-nome").value;

    try {
        const response = await fetch(`${API_URL}/admin/setores`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
            body: JSON.stringify({ nome, empresaId }),
        });

        const data = await response.json();
        if (response.ok) {
            alert("Setor criado com sucesso!");
            loadSetores(empresaId);
        } else {
            alert(data.message);
        }
    } catch (err) {
        alert("Erro ao criar setor.");
    }
});
// Adicionar cargo a um setor
document.getElementById("add-cargos")?.addEventListener("submit", async (e) => {
    e.preventDefault();
    const setorId = document.getElementById("setor-select").value;
    const cargo = document.getElementById("cargo-nome").value;

    try {
        const response = await fetch(`${API_URL}/admin/setores/${setorId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
            body: JSON.stringify({ cargos: [cargo] }),
        });

        const data = await response.json();
        if (response.ok) {
            alert("Cargo adicionado com sucesso!");
            loadSetores(data.empresaId);
        } else {
            alert(data.message);
        }
    } catch (err) {
        alert("Erro ao adicionar cargo.");
    }
});

// Função para carregar setores e cargos da empresa logada
async function loadSetoresECargos() {
    try {
        // Carrega os dados do usuário logado
        const userResponse = await fetch(`${API_URL}/auth/me`, {
            headers: { "Authorization": `Bearer ${token}` },
        });

        if (!userResponse.ok) {
            throw new Error("Erro ao carregar dados do usuário.");
        }

        const user = await userResponse.json();

        // Carrega os setores da empresa logada
        const setoresResponse = await fetch(`${API_URL}/admin/empresas/${user._id}/setores`, {
            headers: { "Authorization": `Bearer ${token}` },
        });

        if (!setoresResponse.ok) {
            throw new Error("Erro ao carregar setores.");
        }

        const setores = await setoresResponse.json();
        const setorSelect = document.getElementById("setor");
        const cargoSelect = document.getElementById("cargo");

        // Preenche a lista de setores
        setorSelect.innerHTML = setores.map(setor => `
            <option value="${setor._id}">${setor.nome}</option>
        `).join("");

        // Atualiza a lista de cargos quando um setor é selecionado
        setorSelect.addEventListener("change", (e) => {
            const setorId = e.target.value;
            const setorSelecionado = setores.find(setor => setor._id === setorId);

            if (setorSelecionado) {
                cargoSelect.innerHTML = setorSelecionado.cargos.map(cargo => `
                    <option value="${cargo}">${cargo}</option>
                `).join("");
            } else {
                cargoSelect.innerHTML = ""; // Limpa a lista de cargos se nenhum setor for selecionado
            }
        });
    } catch (err) {
        console.error(err);
        alert("Erro ao carregar setores e cargos.");
    }
}

// Carregar setores e cargos ao abrir a página de agendamentos
if (window.location.pathname.endsWith("agendamentos.html")) {
    if (!token) {
        window.location.href = "index.html";
    } else {
        loadSetoresECargos(); // Carrega setores e cargos
    }
}

// Atribuir exames a um setor
document.getElementById("assign-exames")?.addEventListener("submit", async (e) => {
    e.preventDefault();
    const setorId = document.getElementById("setor-select-exames").value;
    const exames = Array.from(document.getElementById("exames-select").selectedOptions).map(option => option.value);

    try {
        const response = await fetch(`${API_URL}/admin/setores/${setorId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
            body: JSON.stringify({ exames }),
        });

        const data = await response.json();
        if (response.ok) {
            alert("Exames atribuídos com sucesso!");
        } else {
            alert(data.message);
        }
    } catch (err) {
        alert("Erro ao atribuir exames.");
    }
});