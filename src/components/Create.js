import axios from 'axios'
import {useState} from 'react'
// import {useDispatch} from 'react-redux'
// import {setVehicles} from '../ducks/vehicleReducer'
import {GridLoader} from 'react-spinners'
import Dropzone from 'react-dropzone'
import { v4 as randomString } from 'uuid';

const Create = (props) => {
    const [year, setYear] = useState([])
    const [make, setMake] = useState('')
    const [model, setModel] = useState('')
    const [trim, setTrim] = useState('')
    const [description, setDescription] = useState('')
    const [type, setType] = useState('')
    const [link, setLink] = useState('')
    const [isUploading, setIsUploading] = useState(false)
    // const dispatch = useDispatch()

    const getSignedRequest = ([file]) => {
        // this.setState({ isUploading: true });
        setIsUploading(true)
        const fileName = `${randomString()}-${file.name.replace(/\s/g, '-')}`;
        axios.get('/api/signs3', {params: {'file-name': fileName,'file-type': file.type,},})
          .then(res => {
            const { signedRequest, url } = res.data;
            // this.uploadFile(file, signedRequest, url);
            uploadFile(file, signedRequest, url)
          })
          .catch(err => {
            console.log(err);
          });
    }
    const uploadFile = (file, signedRequest, url) => {
        const options = {
          headers: {
            'Content-Type': file.type,
          },
        };
    
        axios.put(signedRequest, file, options)
          .then(response => {
            // this.setState({ isUploading: false, url });
            setIsUploading(false)
            setLink(url)
            // THEN DO SOMETHING WITH THE URL. SEND TO DB USING POST REQUEST OR SOMETHING
          })
          .catch(err => {
              setIsUploading(false)
            if (err.response.status === 403) {
              alert(
                `Your request for a signed URL failed with a status 403. Double check the CORS configuration and bucket policy in the README. You also will want to double check your AWS_ACCESS_KEY_ID and AWS_SECRET_ACCESS_KEY in your .env and ensure that they are the same as the ones that you created in the IAM dashboard. You may need to generate new keys\n${
                  err.stack
                }`
              );
            } else {
              alert(`ERROR: ${err.status}\n ${err.stack}`);
            }
          });
        
    }
    const submit = () => {
        axios.post('/api/addvehicle', {year, make, model, trim, description, type, link})
        .then(() => console.log('Success'))
        .catch((err) => console.log(err))
        // axios.post('/api/addmod', {description, type})
        // .then(() => console.log('Yuuuuuuhhhhh'))
        // .catch((err) => console.log(err))
        
        props.history.push('/home')
    }
    return(
        <div>
            <h1>Create Post</h1>
            <input placeholder='Year' value={year} onChange={(e) => setYear(e.target.value)} />
            <input placeholder='Make' value={make} onChange={(e) => setMake(e.target.value)} />
            <input placeholder='Model' value={model} onChange={(e) => setModel(e.target.value)} />
            <input placeholder='Trim' value={trim} onChange={(e) => setTrim(e.target.value)} />
            <br />
            <div>
            <Dropzone
          onDropAccepted={getSignedRequest}
          accept="image/*"
          multiple={false}>
          {({getRootProps, getInputProps}) => (
            <div 
              style = {{
              position: 'relative',
              width: 160,
              height: 80,
              borderWidth: 5,
              marginTop: 25,
              borderColor: 'gray',
              borderStyle: 'dashed',
              borderRadius: 5,
              display: 'inline-block',
              fontSize: 17,}}
              {...getRootProps()}>
              <input {...getInputProps()} />
              {isUploading ? <GridLoader /> : <p>Drop files here, or click to select files</p>}
            </div>
          )}
         </Dropzone>
            </div>
            <br />
            <input placeholder='Part/Modification' value={description} onChange={(e) => setDescription(e.target.value)} />
            <input placeholder='Exterior or Interior' value={type} onChange={(e) => setType(e.target.value)} />
            <button onClick={submit}>Submit</button>
        </div>
    )
}


export default Create