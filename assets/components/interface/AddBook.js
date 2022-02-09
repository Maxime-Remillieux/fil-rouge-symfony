import axios from "axios";

const AddBook = () => {

    const url = "http://localhost:8000/book/new";

    const submitForm=() => {
        var data = getFormData();

        axios
        .post(url, data)
        .then((res)=>{
            console.log(res.data);
        });
    }

    const getFormData = ()=> {
        var inputs = document.querySelectorAll('.input-field');
        
        var formData = new FormData();
        var img = document.getElementById('img');
        formData.append('file', img.files[0]);

        var data = {};

        inputs.forEach(input =>{
            var property = input.id.split('-');
            if(property.length === 1){
                data[property[0]] = input.value;
            }else{
                if(!data.hasOwnProperty(property[0])) 
                    data[property[0]] = {};
                data[property[0]][property[1]] = input.value;          
            }
        });

        formData.append('data', JSON.stringify(data));
        return formData;
    }

    return (
        <div className="addDiv">
            <h4>Enregistrer un nouvel ouvrage</h4>
            <div className="formInputs">
                <div><label htmlFor="title">Titre</label><input autoComplete="off" type="text" id="title" className="input-field"/></div>
                <div>
                    <label htmlFor="author-name">Nom auteur</label><input autoComplete="off" list="authors1" type="text" id="author-name" className="input-field"/>
                    <datalist id='authors1'></datalist>
                    <input type="hidden" value="0" id="author-id" className="input-field"/>
                </div>

                <div>
                    <label htmlFor="author-firstname">Prénom</label><input autoComplete="off" list="authors2" type="text" id="author-firstname" className="input-field"/>
                    <datalist id='authors2'></datalist>
                </div>

                <div>
                    <label htmlFor="publisher-name">Éditeur</label><input autoComplete="off" list="publishers" type="text" id="publisher-name" className="input-field" />
                    <datalist id='publishers'></datalist>
                    <input type="hidden" className="input-field" value="0" id="publisher-id"/>
                </div>

                <div>
                    <label htmlFor="collection-name">Collection</label><input autoComplete="off" list="collections" type="text" id="collection-name" className="input-field"/>
                    <datalist id='collections'></datalist>
                    <input type="hidden" className="input-field" value="0" id="collection-id"/>
                </div>
                <div>
                    <label htmlFor="img">Image</label><input type="file" id="img"/>
                </div>

                <div><label htmlFor="release_at">Date</label><input type="date" id="release_at" required /></div>
                <div className="themesDiv">
                    <div>
                        <label htmlFor="theme0"><button id="plus"><i className="fas fa-plus"></i></button>Thèmes</label>
                        <input className="field-input" autoComplete="off" data-index="0" list="themes0" type="text" id="theme0" name="nom_theme" />
                        <datalist id='themes0'></datalist>
                        <input type="hidden" className="values" name="id_theme" value="0" id="id_theme0" data-index="0" />
                    </div>
                </div>
            </div>
            <span id="buttonSpan"><button id="addButton" onClick={ submitForm }>Ajouter</button></span>
        </div>
    );
}

export default AddBook;