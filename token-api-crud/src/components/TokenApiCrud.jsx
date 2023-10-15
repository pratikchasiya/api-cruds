import React, { Fragment, useEffect, useState } from 'react'
import axios from 'axios'

/* TOKEN NO USE KARVA GO REST NAME NI WEBSITE MA GAI AMA USER VALA MA GAI AMA APRE LOGIN KARI AMA J LINK MLSE ANO USE KARVANO */
const TokenApiCrud = () => {
    const [array, setarray] = useState([]);
    const [blankObj, setblankObj] = useState({ name: '', gender: '', status: '', email: '' });
    let [obj, setobj] = useState({ ...blankObj });

    /* TOKEN MA J PN DATA HSE ATO BATAVSE J BUT JYRE APRE POTANA DATA KOI ADD KARIYE AND ANE PN BATAVA HOI TO AA RITE EK OBJECT BATAVI AMA HEADERS NI UNDER AUTHORIZATION LAKHI AMA BEARER LAKHVU COMPULSARY CHE P6I SPACE API APRA TOKEN NI J LINK HOI A NAKHAVNI */
    /* AA RITE TOKEN BANAVYU A APRNE JYA APRE AUTHTOKEN LAKHSU ANE J PERMISSION APSE DATA ADD DELETE EDIT KRVA MATE NI ATLE AUTHTOKEN USE KRVU PDE  */
    let authToken = {
        headers :{
            "Authorization":"Bearer c770f151d75f0717539d114e2b2c3f3d73b77ab3f816e56a35ae4853cbd0300d" 
        }
    }

    const getApiData = () => {
        axios
            .get("https://gorest.co.in/public/v2/users", authToken)
            .then((res) => {
                console.log(res.data);

                setarray([...res.data]);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    useEffect(() => {
        getApiData()
    }, []);

    const getData = (e) => {
        obj[e.target.name] = e.target.value;
        setobj({ ...obj });
        // setblankObj({...blankObj})
    };

    const save = () => {
        if (obj.id == undefined) {
            axios.post('https://gorest.co.in/public/v2/users',obj, authToken).then((res) => {
                console.log(res)
                getApiData()
            }).catch((err) => {
                console.log(err)
            })
        } else {
            // obj.id = obj._id;
            // console.log(obj.id)
            axios.patch('https://gorest.co.in/public/v2/users/'+obj.id, obj, authToken
            ).then((res) => {
                console.log(res)
                getApiData()
            }).catch((err) => {
                console.log(err)
            })
        }

        setobj({ ...blankObj });
    };

    const editData = (id)=>{
        /* AHIYA APRE AXIOS VALI METHOD THI PN DATA GET KARI SAKAY  AND AA METHOD PN USE THAY ARRAY MATHI OBJ NE FIND KRI NE OBJ NE SET KARAVI NE */
        /* AA METHOD USE THAY BECAUSE AMA APRE J KOI PN DATA MA CHANGE KARI SAKAY KOI PN AMA AMJ CHANGE NI KRI SKE */
        let editObj = array.find(x => x.id === id);
        setobj({ ...editObj });
        console.log(editObj)


        /* AA AXIOS METHOD THI PN THAY */
        
        // axios.get('https://gorest.co.in/public/v2/users/' + id, authToken).then((res) => {
        //     console.log(res)
        //     // getApiData()
        //     setobj({ ...res.data});
        // }).catch((err) => {
        //     console.log(err)
        // })

    }

    const deleteData = (id)=>{
        axios.delete('https://gorest.co.in/public/v2/users/'+id, authToken
        ).then((res) => {
            console.log(res)
            getApiData()
        }).catch((err) => {
            console.log(err)
        })
    }

    return (
        <Fragment>
            <div>TokenApiCrud</div>

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
                  <button className="btn btn-success me-2" onClick={() => editData(x.id)}>EDIT</button>
                  <button className="btn btn-danger me-2" onClick={()=> deleteData(x.id)}>DELETE</button>
                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </Fragment>
    )
}

export default TokenApiCrud