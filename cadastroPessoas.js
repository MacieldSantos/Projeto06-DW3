// Classe Base de Pessoa
export class Pessoa {

    constructor(dados) {
        this.nome = dados.nome;
        this.email = dados.email;
        this.telefone = dados.telefone;
        this.cep = dados.cep;
        this.logradouro = dados.logradouro;
        this.numero = dados.numero;
        this.complemento = dados.complemento;
        this.bairro = dados.bairro;
        this.cidade = dados.cidade;
        this.estado = dados.estado;
    }
}

// Subclasse Estudante
export class Estudante extends Pessoa {
    constructor(dados) {
        super(dados);
        this.tipo = 'estudante';
    }
}

// Subclasse Professor
export class Professor extends Pessoa {
    constructor(dados) {
        super(dados);
        this.tipo = 'professor';
    }
}

// Subclasse Administrativo
export class Administrativo extends Pessoa {
    constructor(dados) {
        super(dados);
        this.tipo = 'administrativo';
    }
}

// Subclasse Terceiro
export class Terceiro extends Pessoa {

    constructor(dados) {
        super(dados);
        this.tipo = 'terceiro'; 
    }
}

// Subclasse Visitante
export class Visitante extends Pessoa {

    constructor(dados) {
        super(dados);
        this.tipo = 'visitante';
    }
}

// CRIADOR - (FÁBRICAS)
// Fábrica Base de Cadastro de Pessoas
class CadastroPessoas {
    criarPessoa() {
        throw new Error("Método deve ser implementado pelas subclasses");
    }
}
// Fábrica Concreta de Estudantes
export class CadastroEstudante extends CadastroPessoas {
    criarPessoa(dados) {
        return new Estudante(dados);
    }
}
// Fábrica Concreta de Professores
export class CadastroProfessor extends CadastroPessoas {
    criarPessoa(dados) {
        return new Professor(dados);
    }
}
// Fábrica Concreta de Administrativos
export class CadastroAdministrativo extends CadastroPessoas {
    criarPessoa(dados) {
        return new Administrativo(dados);     
    }
}
// Fábrica Concreta de Terceiros
export class CadastroTerceiro extends CadastroPessoas {
    criarPessoa(dados) {
        return new Terceiro(dados);
    }
}
// Fábrica Concreta de Visitantes
export class CadastroVisitante extends CadastroPessoas {
    criarPessoa(dados) {
        return new Visitante(dados);
    }
}

// USO DO PADRÃO ---------------------------------------------------------

// Mapeamento central das Fábricas
export const fabricas = {
    estudante:      new CadastroEstudante(),
    professor:      new CadastroProfessor(),
    administrativo: new CadastroAdministrativo(),
    terceiro:       new CadastroTerceiro(),
    visitante:      new CadastroVisitante()
};

