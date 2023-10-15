import React, { Fragment, useEffect, useState } from "react";
import axios from "axios";

const ApiCrud = () => {
  const [array, setarray] = useState([]);
  let [obj, setobj] = useState({ hobbies: [], firstName: '', lastName: '', gender: '', city: '', age: '' });
  const [blankObj, setblankObj] = useState({});

  const getApiData = () => {
    axios
      .get("https://student-api.mycodelibraries.com/api/student/get")
      .then((res) => {
        // console.log(res.data.data);

        setarray([...res.data.data]);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getApiData()
  }, []);

  const getData = (e) => {
    if (e.target.name == "hobbies") {
      if (e.target.checked) {
        obj.hobbies.push(e.target.value);
      } else {
        obj.hobbies = obj.hobbies.filter((x) => x != e.target.value);

      }
      blankObj.hobbies = [];
    }

    else {
      obj[e.target.name] = e.target.value;

      blankObj[e.target.name] = "";
    }
    setobj({ ...obj });
    setblankObj({ ...blankObj });
  };

  const save = () => {
    if (obj._id == undefined) {
      axios.post('https://student-api.mycodelibraries.com/api/student/add', obj).then((res) => {
        console.log(res)
        getApiData()
      }).catch((err) => {
        console.log(err)
      })
    } else {
      obj.id = obj._id;
      // console.log(obj.id)
      axios.post('https://student-api.mycodelibraries.com/api/student/update', obj
      ).then((res) => {
        console.log(res)
        getApiData()
      }).catch((err) => {
        console.log(err)
      })
    }

    setobj({ ...blankObj });
  };

  const editData = (id) => {
   
    axios.get('https://student-api.mycodelibraries.com/api/student/get-student-by-id?id='+id).then((res) => {
      // console.log(res.data.data)
      res.data.data.hobbies = res.data.data.hobbies.split(',');
      setobj({ ...res.data.data});
      // setobj({ ...res.data.data })
    }).catch((err) => {
      console.log(err)
    })
  }

  const deleteData = (id) => {
    axios.delete('https://student-api.mycodelibraries.com/api/student/delete?id='+id).then((res)=>{
      console.log(res)
      getApiData();
    }).catch((err) => {
      console.log(err)
    })
  }


  return (
    <Fragment>
      <div>ApiCrud</div>


      <form action="" className="w-50 mx-auto border border-1 p-4 mt-5" >
        <h3>FORM </h3>
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
                <td>{x.firstName}</td>
                <td>{x.lastName}</td>
                <td>{x.hobbies}</td>
                <td>{x.gender}</td>
                <td>{x.city}</td>
                <td>{x.age}</td>
                <td>
                  <button className="btn btn-success me-2" onClick={() => editData(x._id)}>EDIT</button>
                  <button className="btn btn-danger me-2" onClick={()=> deleteData(x._id)}>DELETE</button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </Fragment>
  );
};

export default ApiCrud;
