import React, { Fragment, useEffect, useState } from 'react'
import axios from 'axios'

/* FETCH METHOD A JAVASCRIPT NI INBUILT METHOD CHE JAVASCRIPT THI API CALL KARVU HOI TO FETCH METHOD NO USE THY */

const FetchApiCrud = () => {
    let [array, setarray] = useState([]);
    let [obj, setobj] = useState({ hobbies: [], firstName: '', lastName: '', gender: '', city: '', age: '' });
    const [blankObj, setblankObj] = useState({});

    const getApiData = () => {

        fetch('https://student-api.mycodelibraries.com/api/user/get').then(async (res) => {
            /* DIRECT ARRAY SET NAI THSE ATLE ANE PEHLA ARRAY MA STOTE KARI P6I ANE SET KARAVYO AND ARRAY.DATA KARAVTHI A ARRAY MLSE */
            /* FETCH METHOD A JSON FORMAT MA RESPONCE NAI APE ATLE ANE PEHLA JSON FORMAT MA CONVERT KARVU PDE */
            /* PROMISE PENDING NI ERROR AVE TYRE ASYNC AWAIT MUKVU J PDE */
            array = await res.json()
            setarray([...array.data]);
        }).catch((err) => {
            console.log(err)
        })
    };

    useEffect(() => {
        getApiData()
    }, []);


    const getData = (e) => {
        if (e.target.name == "hobbies") {
            if (e.target.checked) {
                obj.hobbies?.push(e.target.value);
            } else {
                obj.hobbies = obj.hobbies.filter((x) => x != e.target.value);

            }
            blankObj.hobbies = [];
        }
        else if (e.target.name == 'userImage') {
            obj[e.target.name] = e.target.files[0];
        }

        else {
            obj[e.target.name] = e.target.value;

            blankObj[e.target.name] = "";
        }
        setobj({ ...obj });
        setblankObj({ ...blankObj });
    };

    const save = () => {

        /* FORM DATA NI KEY AND VALUE JANVI HOI TO AA RITE ENTRIES METHOD JANI SAKAY */
        let formData = new FormData();
        for (let x of formData.entries()) {
            console.log(x)
        }


        formData.append('firstName', obj.firstName);
        formData.append('lastName', obj.lastName);
        formData.append('hobbies', obj.hobbies);
        formData.append('gender', obj.gender);
        formData.append('city', obj.city);
        formData.append('age', Number(obj.age));
        formData.append('userImage', obj.userImage);

        if (obj._id == undefined) {
            fetch('https://student-api.mycodelibraries.com/api/user/add', {
                method: 'POST',
                body: formData,
            }).then(async (res) => {
                console.log(await res.json())
                getApiData()
            }).catch((err) => {
                console.log(err)
            })
        } else {
            // obj.id = obj._id;
            formData.append('id', obj._id);

            fetch('https://student-api.mycodelibraries.com/api/user/update', {
                method: 'POST',
                body: formData  /* OBJ HOI TO OBJ LAKHVANU FORMDATA NI JAGYA A */
            }).then(async (res) => {
                console.log(res)
                getApiData()
            }).catch((err) => {
                console.log(err)
            })
        }

        setobj({ ...blankObj });
    };

    const editData = (id) => {

        fetch('https://student-api.mycodelibraries.com/api/user/get-user-by-id?id=' + id).
        then(async (res) => {
            console.log(res)
            let editObj = await res.json();
            editObj.data.hobbies = editObj.data.hobbies.split(',');
            setobj({ ...editObj.data });

        }).catch((err) => {
            console.log(err)
        })
    }

    const deleteData = (id) => {
        // axios.delete('https://student-api.mycodelibraries.com/api/user/delete?id=' + id).then((res) => {
        //     console.log(res)
        //     getApiData();
        // }).catch((err) => {
        //     console.log(err)
        // })

        fetch('https://student-api.mycodelibraries.com/api/user/delete?id=' + id, {
            method: 'DELETE',
        }).then(async (res) => {
            console.log(res)
            getApiData()
        }).catch((err) => {
            console.log(err)
        })
    }
    return (
        <Fragment>
            <div>FetchApiCrud</div>

            <form action="" className="w-50 mx-auto border border-1 p-4 mt-5" >
                <h3>Fetch Api Crud </h3>
                <label htmlFor="" className="d-block">
                    First Name :
                </label>
                <input type="text" name="firstName" className="w-100" value={obj.firstName || ""}
                    onChange={getData} />

                <label htmlFor="" className="d-block">
                    Last Name :
                </label>
                <input type="text" name="lastName" className="w-100" value={obj.lastName || ""}
                    onChange={getData} />

                <label htmlFor="" className="d-block">
                    Hobby :
                </label>
                <input type="checkbox" name="hobbies" value="Red" className="me-2" checked={obj.hobbies?.includes("Red")}
                    onChange={getData} />
                Red
                <input type="checkbox" name="hobbies" value="Blue" className="mx-2" checked={obj.hobbies?.includes("Blue")}
                    onChange={getData} />
                Blue
                <input type="checkbox" name="hobbies" value="Black" className="mx-2" checked={obj.hobbies?.includes("Black")}
                    onChange={getData} />
                Black
                <input type="checkbox" name="hobbies" value="Yellow" className="mx-2" checked={obj.hobbies?.includes("Yellow")}
                    onChange={getData} />
                Yellow

                <input
                    type="checkbox"
                    name="hobbies"
                    value="Travelling"
                    className="mx-2"
                    checked={obj.hobbies?.includes("Travelling")}
                    onChange={getData}
                />
                Travelling
                <input
                    type="checkbox"
                    name="hobbies"
                    value="Reading"
                    className="mx-2"
                    checked={obj.hobbies?.includes("Reading")}
                    onChange={getData}
                />
                Reading

                <label htmlFor="" className="d-block">
                    Gender :
                </label>

                <input type="radio" name="gender" value="Male" className="me-2" checked={obj.gender == "Male"}
                    onChange={getData} />
                Male

                <input type="radio" name="gender" value="Female" className="mx-2" checked={obj.gender == "Female"}
                    onChange={getData} />
                Female

                <label htmlFor="" className="d-block">
                    City :
                </label>
                <select name="city" id="" onChange={getData} className="w-100">
                    <option value="Surat">Surat</option>
                    <option value="Vadodara">Vadodara</option>
                    <option value="Bharuch">Bharuch</option>
                </select>


                <label htmlFor="" className="d-block">
                    Age :
                </label>
                <input type="number" name="age" value={obj.age || ''} onChange={getData} />

                <label htmlFor="" className="d-block">
                    Profile :
                </label>
                <input type="file" name="userImage" onChange={getData} className='w-100' />
                <br />

                <button type="button" className="btn btn-success mt-4" onClick={save}>
                    Save
                </button>
            </form>

            {/* TABLE */}

            <table className="table mt-5">
                <thead>
                    <tr>
                        <th>Sr. No</th>
                        <th>Profile</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Hobby</th>
                        <th>Gender</th>
                        <th>City</th>
                        <th>Age</th>
                        <th>Actions</th>
                    </tr>
                </thead>

                <tbody>
                    {array?.map((x, i) => {

                        return (

                            <tr key={i}>
                                <td>{i + 1}</td>
                                <td><img src={x.image} alt="" height={40} width={40} /></td>
                                <td>{x.firstName}</td>
                                <td>{x.lastName}</td>
                                <td>{x.hobbies}</td>
                                <td>{x.gender}</td>
                                <td>{x.city}</td>
                                <td>{x.age}</td>
                                <td>
                                    <button className="btn btn-success me-2" onClick={() => editData(x._id)}>EDIT</button>
                                    <button className="btn btn-danger me-2" onClick={() => deleteData(x._id)}>DELETE</button>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </Fragment>
    )
}

export default FetchApiCrud