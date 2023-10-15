import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { Fragment } from 'react'
import axios from 'axios'
import { useLayoutEffect } from 'react';
import loaderService from '../loaderService/loaderService';
import Swal from 'sweetalert2';
import { AiOutlineClose } from 'react-icons/ai'
import { closeImage, openImage } from '../imageService';

const UserApiCrud = () => {
    const [array, setarray] = useState([]);
    let [obj, setobj] = useState({ hobbies: [], firstName: '', lastName: '', gender: '', city: '', age: '' });
    const [blankObj, setblankObj] = useState({});

    const getApiData = () => {
        loaderService(true)
        axios
            .get("https://student-api.mycodelibraries.com/api/user/get")
            .then((res) => {
                // console.log(res.data.data);

                loaderService(false)
                setarray([...res.data.data]);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    // console.log('UserApiCrud')
    useEffect(() => {
        // console.log('useEffect')
        getApiData()
    }, []);

    /* AA SAME USE EFFECT JEVU J CHE AND A USE EFFECT PEHLA RUN THSE */
    // useLayoutEffect(() => {
    //  console.log('useLayoutEffect')
    // }, [])

    const getData = (e) => {
        if (e.target.name == "hobbies") {
            if (e.target.checked) {
                obj.hobbies.push(e.target.value);
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
        /* FORM DATA A INBUILT CHE AND AMA OBJECT BNE */
        /* IMAGE KA TO PDF FILE AVU KAI HOI TO FORM DATA THI PASS KARVANA */

        loaderService(true)
        let formData = new FormData();

        /* APPEND A EK METHOD CHE FORM DATA NI AMA FIRST ARGUMENT MA PROPERTY NU NAME AND SECOND ARGUMENTS MA ANI VALUE LAKHVANI OBJ.FIRSTNAME MA VALUE AVSE */

        formData.append('firstName', obj.firstName);
        formData.append('lastName', obj.lastName);
        formData.append('hobbies', obj.hobbies);
        formData.append('gender', obj.gender);
        formData.append('city', obj.city);
        formData.append('age', obj.age);
        formData.append('userImage', obj.userImage);

        if (obj._id == undefined) {
            /* AHI OBJ NI JAGYA A FORMDATA NAKHYU KM K HVE BDHI VALUE FORMDATA MA HSE */
            axios.post('https://student-api.mycodelibraries.com/api/user/add', formData).then((res) => {
                console.log(res)
                getApiData()
                loaderService(false)
            }).catch((err) => {
                console.log(err)
            })
        } else {
            /* AHI PM OBJ.ID = OBJ_ID NI JAGYA ANE PN FORM DATA MA APPEND KARAVI DEVANU */
            // obj.id = obj._id;

            formData.append('id', obj._id);

            axios.post('https://student-api.mycodelibraries.com/api/user/update', formData
            ).then((res) => {
                console.log(res)
                getApiData()
                loaderService(false)
            }).catch((err) => {
                console.log(err)
            })
        }

        setobj({ ...blankObj });
    };

    const editData = (id) => {

        axios.get('https://student-api.mycodelibraries.com/api/user/get-user-by-id?id=' + id).then((res) => {
            // console.log(res.data.data)
            res.data.data.hobbies = res.data.data.hobbies.split(',');
            setobj({ ...res.data.data });
            // setobj({ ...res.data.data })
        }).catch((err) => {
            console.log(err)
        })
    }

    const deleteData = (id) => {

        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!',
            toast: 'true'  /* ANATHI POP UP SMALL THSE BY DEFAULT J AVA ANATHI SMALL AAVSE */
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete('https://student-api.mycodelibraries.com/api/user/delete?id=' + id).then((res) => {
                    console.log(res)
                    getApiData();
                }).catch((err) => {
                    console.log(err)
                })

                Swal.fire(
                    'Deleted!',
                    'Your file has been deleted.',
                    'success'
                )
            }
        })
        // axios.delete('https://student-api.mycodelibraries.com/api/user/delete?id=' + id).then((res) => {
        //     console.log(res)
        //     getApiData();
        // }).catch((err) => {
        //     console.log(err)
        // })
    }
    return (
        <Fragment>

            <div>UserApiCrud</div>

            <form action="" className="w-50 mx-auto border border-1 p-4 mt-5" >
                <h3>User Api Crud </h3>
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
                <input type="checkbox" name="hobbies" value="red" className="me-2" checked={obj.hobbies?.includes("red")}
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
                                <td><img src={x.image} alt="" height={40} width={40} onClick={() => openImage(x.image)} /></td>
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

            <div className='image-div'>
                <AiOutlineClose color='white' className='closeIcon' size={30} onClick={closeImage} />
                {/* <img src="/logo192.png" alt="" height={100} width={100} /> */}
                <div className='img_src'></div>
            </div>
        </Fragment>
    )
}

export default UserApiCrud