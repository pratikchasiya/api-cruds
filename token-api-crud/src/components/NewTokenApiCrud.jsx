import React, { Fragment, useEffect, useState } from 'react'
import axios from 'axios'

/* TOKEN NO USE KARVA GO REST NAME NI WEBSITE MA GAI AMA USER VALA MA GAI AMA APRE LOGIN KARI AMA J LINK MLSE ANO USE KARVANO */
const NewTokenApiCrud = () => {
    const [array, setarray] = useState([]);
    const [blankObj, setblankObj] = useState({ name: '', gender: '', status: '', email: '' });
    let [obj, setobj] = useState({ ...blankObj });

    let authToken = {
        headers: {
            'Authorization': 'Bearer c770f151d75f0717539d114e2b2c3f3d73b77ab3f816e56a35ae4853cbd0300d'
        }
    }

    const getApiData = () => {
        axios.get('https://gorest.co.in/public/v2/users', authToken).then((res) => {
            console.log(res.data)
            setarray([...res.data])
        }).catch((err) => {
            console.log(err)
        })
    }
    useEffect(() => {
        getApiData()
    }, [])


    const getData = (e) => {
        obj[e.target.name] = e.target.value;
        setobj({ ...obj })
    }
    const save = () => {
        if (obj.id == undefined) {
            axios.post('https://gorest.co.in/public/v2/users', obj, authToken).then((res) => {
                console.log(res)
                getApiData()

            }).catch((err) => {
                console.log(err)
            })
        }
        else {
            axios.patch('https://gorest.co.in/public/v2/users/' + obj.id, obj, authToken).then((res) => {
                console.log(res)
                getApiData()
            }).catch((err) => {
                console.log(err)
            })
        }
        setobj({ ...blankObj })
    }
    const editData = (id) => {
   
        //    let editObj = array.find((x) => x.id == id)
        //     setobj({...editObj})
        axios.get('https://gorest.co.in/public/v2/users/' + id, authToken).then((res) => {
            console.log(res)
            // getApiData()
            setobj({ ...res.data});
        }).catch((err) => {
            console.log(err)
        })

    }
    const deleteData = () => { }

    return (
        <Fragment>
            <div>NewTokenApiCrud</div>

            <form action="" className="w-50 mx-auto border border-1 p-4 mt-5" >
                <h3>FORM </h3>
                <label htmlFor="" className="d-block">
                    Name :
                </label>
                <input type="text" name="name" className="w-100" value={obj.name || ""}
                    onChange={getData} />

                <label htmlFor="" className="d-block">
                    Email :
                </label>
                <input type="email" name="email" className="w-100" value={obj.email || ""}
                    onChange={getData} />


                <label htmlFor="" className="d-block">
                    Gender :
                </label>

                <input type="radio" name="gender" value="male" className="me-2" checked={obj.gender == "male"}
                    onChange={getData} />
                Male

                <input type="radio" name="gender" value="female" className="mx-2" checked={obj.gender == "female"}
                    onChange={getData} />
                Female

                <label htmlFor="" className="d-block">
                    Status :
                </label>

                <input type="radio" name="status" value="active" className="me-2" checked={obj.status == "active"}
                    onChange={getData} />
                Active

                <input type="radio" name="status" value="inactive" className="mx-2" checked={obj.status == "inactive"}
                    onChange={getData} />
                InActive

                <br />

                <button type="button" className="btn btn-success mt-4" onClick={save}>
                    Save
                </button>
            </form>

            {/* TABLE */}

            <table className="table mt-5">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Gender</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {array?.map((x, i) => {
                        return (
                            <tr key={i}>
                                <td>{x.id}</td>
                                <td>{x.name}</td>
                                <td>{x.email}</td>
                                <td>{x.gender}</td>
                                <td>{x.status}</td>
                                <td>
                                    <button className='btn btn-success me-2' onClick={() => editData(x.id)}>EDIT</button>
                                    <button className='btn btn-danger' onClick={() => deleteData(x.id)}>DELETE</button>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>


            </table>
        </Fragment>
    )
}

export default NewTokenApiCrud