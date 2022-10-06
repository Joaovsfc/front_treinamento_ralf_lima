import { useEffect, useState } from 'react';
import './App.css';
import Formulario from './Formulario';
import Tabela from './Tabela';

function App() {

  const produto = {
    codigo:0,
    nome :'',
    marca:''
  }

  const [btnCadastrar, setbBtnCadastrar] = useState(true);
  const [produtos, setProdutos] = useState([]);
  const [objProdutos, setObjProdutos] = useState(produto );

  useEffect(()=>{
    fetch("http://localhost:8080/listar")
    .then(retorno => retorno.json())
    .then(retorno_convertido => setProdutos(retorno_convertido));
  }, [])

  const aoDigitar = (e) => {
    setObjProdutos({...objProdutos, [e.target.name]:e.target.value});
  }

  const cadastrar = () => {
    fetch('http://localhost:8080/cadastrar',{
    method:'post',
    body:JSON.stringify(objProdutos),
    headers:{
      'Content-type':'application/json',
      'Accept':'application/json' 
    }
  })
  .then(retorno => retorno.json())
  .then(retorno_convertido => {
    if(retorno_convertido.mensagem !== undefined){
      alert(retorno_convertido.mensagem);
    }else{
      setProdutos([...produtos,retorno_convertido]);
      alert('Produto cadastrado com sucesso')
      limparFormulario()
    }
  })
  }

  const remover = () => {
    fetch('http://localhost:8080/remover/'+objProdutos.codigo,{
    method:'delete',
    headers:{
      'Content-type':'application/json',
      'Accept':'application/json' 
    }
  })
  .then(retorno => retorno.json())
  .then(retorno_convertido => {
    
    alert(retorno_convertido.mensagem);

    let vetorTem = [...produtos]

    let indice = vetorTem.findIndex((p) =>{
      return p.codigo === objProdutos.codigo;
    })

    vetorTem.splice(indice,1);//removendo do vetor temp

    setProdutos(vetorTem);

    limparFormulario();
  })
  }
  
  const alterar = () => {
    fetch('http://localhost:8080/alterar',{
    method:'put',
    body:JSON.stringify(objProdutos),
    headers:{
      'Content-type':'application/json',
      'Accept':'application/json' 
    }
  })
  .then(retorno => retorno.json())
  .then(retorno_convertido => {
    if(retorno_convertido.mensagem !== undefined){
      alert(retorno_convertido.mensagem);
    }else{
      
      alert('Produto alterado com sucesso')

      let vetorTem = [...produtos]

      let indice = vetorTem.findIndex((p) =>{
        return p.codigo === objProdutos.codigo;
      })
  
      vetorTem[indice] = objProdutos;
  
      setProdutos(vetorTem);

      limparFormulario()
    }
  })
  }

  const limparFormulario = () => {
    setObjProdutos(produto);
    setbBtnCadastrar(true);
  }

  const selecionarProduto = (indice) => {
    setObjProdutos(produtos[indice]);
    setbBtnCadastrar(false);
  }
  return (
    <div>

      <Formulario botao={btnCadastrar} eventoTeclado={aoDigitar} cadastrar={cadastrar} obj={objProdutos}  cancelar={limparFormulario} remover={remover} alterar={alterar}/>
      <Tabela vetor={produtos} selecionar={selecionarProduto}/> 
    </div>
  );
}

export default App;
