function Tabela ({vetor, selecionar}){
    return(
        <table className='table' >
            <thead>
                <tr>
                    <th>#</th>
                    <th>Nome</th>
                    <th>Marca</th>
                    <th>Selecionar</th>
                </tr>
            </thead>
            <tbody>
                {
                    vetor.map((obj, indice) => (
                        <tr key={indice}>
                            <th>{indice+1}</th>
                            <th>{obj.nome}</th>
                            <th>{obj.marca}</th>
                            <th> <button onClick={() => {selecionar(indice)}} className="btn btn-success" >Selecionar</button> </th>
                        </tr>

                    ))
                }
            </tbody>
        </table>
    )
 }

 export default Tabela;