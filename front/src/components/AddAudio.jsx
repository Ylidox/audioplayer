import {useState } from 'react';

function AddAudio() {
    let [file, setFile] = useState(null);
    let [name, setName] = useState('');
    let [author, setAuthor] = useState('');
	let [token, setToken] = useState('');

    let changeFileHandler = (event) => {
        setFile(event.target.files[0]);
		setName(event.target.files[0].name);
    }

	let submit = async (event) => {
		event.preventDefault();
        if(!file || !name) return;
		let url = `/audio/add`;
        let formData = new FormData();
        formData.append('file', file);
        formData.append('name', name);
        formData.append('author', author);

		console.log(file, name, author)

        let res = await fetch(url, {
            method:'POST',
            headers: {
                authorization: token
            },
            body: formData
        });
        let ans = await res.json();
        console.log(ans);
	}

    return (
        <div>
            <input type="file" onChange={changeFileHandler}/>
            <input 
                type="text"
                onChange={(e) => setName(e.target.value)}
                value={name}
                placeholder='Название'/>
            <input 
                type="text"
                onChange={(e) => setAuthor(e.target.value)}
                value={author}
                placeholder='Автор'
                />
			<textarea 
				cols="30" rows="10"
				onChange={(e) => setToken(e.target.value)}
                value={token}
                placeholder='Токен'>
			</textarea>
			<button onClick={submit}>
				submit
			</button>
        </div>
    );
}

export default AddAudio;