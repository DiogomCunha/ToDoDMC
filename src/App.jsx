import { useState } from "react";
import "./App.css";
function App() {
  const [id, setId] = useState("");
  const [titulo, setTitulo] = useState("");
  const [categoria, setCategoria] = useState("");
  const [data, setData] = useState("");
  const [descricao, setDescricao] = useState("");

  const [listaTarefas, setListaTarefas] = useState([]);

  function addTarefa(event) {
    event.preventDefault();

    setListaTarefas([
      ...listaTarefas,
      {
        id: Date.now(),
        titulo: titulo,
        categoria: categoria,
        data: data,
        descricao: descricao,
      },
    ]);

    setTitulo("");
    setCategoria("");
    setData("");
    setDescricao("");
    setId("");
  }

  function editarTarefa(event) {
    event.preventDefault();

    const copyListaTarefas = [...listaTarefas];
    const index = copyListaTarefas.findIndex((tarefas) => tarefas.id === id);

    copyListaTarefas[index].titulo = titulo;
    copyListaTarefas[index].categoria = categoria;
    copyListaTarefas[index].data = data;
    copyListaTarefas[index].descricao = descricao;

    setListaTarefas(copyListaTarefas);

    setTitulo("");
    setCategoria("");
    setData("");
    setDescricao("");
    setId("");
  }

  function deletarTarefa(id) {
    if (confirm("Certeza que deseja apagar a tarefa?")) {
      const result = listaTarefas.filter((item) => item.id !== id);
      setListaTarefas(result);
    }
  }
  function preencheEstado(item) {
    setTitulo(item.titulo);
    setCategoria(item.categoria);
    setData(item.data);
    setDescricao(item.descricao);
    setId(item.id);
  }

  return (
    <div className="App">
      <div className="h1">
        <h1>ToDo DMC</h1>
      </div>
      <div className="container">
        <div className="formulario">
          <form onSubmit={id ? editarTarefa : addTarefa}>
            <h2>Tarefas</h2>
            <input required
              type="text"
              value={titulo}
              onChange={(event) => setTitulo(event.target.value)}
              placeholder="Titulo"
            />
            <br />
            <select required
              value={categoria}
              onChange={(event) => setCategoria(event.target.value)}
            >
              <option value="">Selecione uma Opção</option>
              <option value="Trabalho">Trabalho</option>
              <option value="Lazer">Lazer</option>
              <option value="Prioridade">Prioridade</option>
              <option value="Outros">Outros</option>
            </select>
            <br />
            <input required
              type="date"
              value={data}
              onChange={(event) => setData(event.target.value)}
              placeholder="Selecione a data"
            />
            <br />
            <input
              type="text"
              value={descricao}
              onChange={(event) => setDescricao(event.target.value)}
              placeholder="Descrição da Tarefa"
            />
            <br />
            <input
              className="botao_form"
              type="submit"
              value={id ? "Salvar" : "Cadastrar"}
            />
          </form>
        </div>
        <div className="task">
          {listaTarefas.length > 0 ? (
            <ul>
              {listaTarefas.map((item) => (
                <li
                  className="desc"
                  key={item.id}
                 
                >
                  <div className="desc2">
                    <h3>{item.titulo}</h3>
                    <p>{item.categoria}</p>
                    <p>{item.descricao}</p>
                  </div>
                  <div className="data">
                    <p>{item.data}</p>

                    <button className="botao_delet" onClick={() => deletarTarefa(item.id)}>
                      Deletar
                    </button>
                    <button className="botao_edit" onClick={() => preencheEstado(item)}>Editar</button>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p>Nenhuma Tarefa Cadastrada</p>
          )}
        </div>
      </div>
    </div>
  );
}
export default App;
