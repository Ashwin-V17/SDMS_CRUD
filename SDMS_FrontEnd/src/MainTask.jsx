import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./MainTask.css";

const MainTask = () => {
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [date, setDate] = useState("");
  const [age, setAge] = useState("");
  const [address, setAddress] = useState("");
  const [sub1, setSub1] = useState("");
  const [sub2, setSub2] = useState("");
  const [sub3, setSub3] = useState("");
  const [sub4, setSub4] = useState("");
  const [sub5, setSub5] = useState("");
  const [sub6, setSub6] = useState("");
  const [acknowledge, setAcknowledge] = useState("");
  const [total, setTotal] = useState(0);
  const [avg, setAvg] = useState(0);
  const [district, setDistrict] = useState("");
  const [taluk, setTaluk] = useState([]);
  const [division, setDivision] = useState([]);
  const [isInvalid, setIsInvalid] = useState(false);

  useEffect(() => {
    const invalidMarks = [sub1, sub2, sub3, sub4, sub5, sub6].some((mark) => {
      const numericMark = parseInt(mark, 10);
      return numericMark > 100 || numericMark < 0;
    });
    setIsInvalid(invalidMarks);
  }, [sub1, sub2, sub3, sub4, sub5, sub6]);

  const handleInputChange = (e, setFunction) => {
    const value = e.target.value;
    if (/^\d{0,3}$/.test(value)) {
      setFunction(value);
    }
  };

  const getPassFailMessage = (mark) => {
    if (mark === "") return "";
    const numericMark = parseInt(mark, 10);
    if (numericMark >= 0 && numericMark < 35) {
      return <span style={{ color: "red" }}>Fail</span>;
    } else if (numericMark >= 35 && numericMark <= 100) {
      return <span style={{ color: "green" }}>Pass</span>;
    } else if (numericMark > 100 || numericMark < 0) {
      return <span style={{ color: "red" }}>Not Valid</span>;
    } else {
      return "";
    }
  };

  let handleSubmit = async (e) => {
    e.preventDefault();
    const datePart = new Date(date).toISOString().split("T")[0];
    let ackwoledge = name.split("").splice(0, 3).join("").toUpperCase();
    let randomVal = ackwoledge + Math.round(Math.random() * 10000);
    setAcknowledge(randomVal);

    let totalValue =
      Number(sub1) +
      Number(sub2) +
      Number(sub3) +
      Number(sub4) +
      Number(sub5) +
      Number(sub6);
    setTotal(totalValue);

    let averageValue = Math.round(totalValue / 6);
    setAvg(averageValue);

    let formValues = {
      name,
      mobile,
      date: datePart,
      age,
      address,
      sub1,
      sub2,
      sub3,
      sub4,
      sub5,
      sub6,
      randomVal,
      total: totalValue,
      avg: averageValue,
    };

    try {
      await axios.post("http://localhost:3000/create", formValues);
      console.log("form values sent to background");
    } catch (error) {
      console.log(`error on submitting form ${error}`);
    }
  };

  let dateChange = (e) => {
    let val = e.target.value;
    setDate(val);
    let num = val.split("").splice(0, 4).join("");
    let todayDate = new Date();
    let currentYear = todayDate.getFullYear();
    setAge(currentYear - Number(num));
  };

  let selectTV = (t, v) => {
    setTaluk(t);
    setDivision(v);
  };

  let handledistrict = (e) => {
    setDistrict(e.target.value);
    switch (e.target.value) {
      case "Chennai": {
        let taluk = ["Thiruuvottriyur", "Guindy", "Egmore", "Adyar"];
        let division = ["Chennai North", "Chennai Central", "Chennai South"];
        selectTV(taluk, division);
        break;
      }

      case "Vellore": {
        let taluk = [
          "Tirupathur",
          "Arakonam",
          "Wallajah",
          "Gudiyatham",
          "Arcot",
        ];
        let division = ["Vellore", "Ranipet", "Tirupattur"];
        selectTV(taluk, division);
        break;
      }

      case "Madurai": {
        let division = ["Madurai", "Melur", "Usilampatti", "Thirumangalam"];
        let taluk = [
          "Madurai North",
          "Madurai West",
          "Madurai East",
          "Madurai South",
        ];
        selectTV(taluk, division);
        break;
      }
      case "Coimbatore": {
        let division = ["Coimbatore North", "Pollachi", "Coimbatore South"];
        let taluk = [
          "sulur",
          "Mettupalayam",
          "Valparai",
          "Anamalai",
          "Madukarai",
        ];
        selectTV(taluk, division);
        break;
      }
      case "Erode": {
        let taluk = ["Thiruuvottriyur", "Guindy", "Egmore", "Adyar"];
        let division = ["Chennai North", "Chennai Central", "Chennai South"];
        selectTV(taluk, division);
        break;
      }
      default:
        break;
    }
  };

  return (
    <div className="Main-container">
      <form action="" onSubmit={handleSubmit}>
        <h1 className="main-title">Student Details Management System </h1>
        <div className="form-contents">
          <label htmlFor="">Name</label>
          <input
            type="text"
            placeholder="enter name"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="form-contents">
          <label htmlFor="">Mobile</label>
          <input
            type="tel"
            placeholder="enter phone"
            name="mobile"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
          />
        </div>
        <div className="form-contents">
          <label htmlFor="">DOB</label>
          <input
            type="date"
            name="date"
            value={date}
            onChange={dateChange}
            required
          />
        </div>
        <div className="form-contents">
          <label htmlFor="">Age</label>
          <input
            type="number"
            placeholder="enter Age"
            value={age}
            required
            readOnly
          />
        </div>
        <div className="form-contents">
          <label htmlFor="">Address</label>
          <textarea
            name="address"
            cols="30"
            rows="10"
            placeholder="Enter Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          ></textarea>
        </div>
        <div className="form-contents">
          <label htmlFor="">District</label>
          <select
            name="district"
            value={district}
            onChange={handledistrict}
            required
          >
            <option value="">Select District</option>
            <option value="Chennai">Chennai</option>
            <option value="Madurai">Madurai</option>
            <option value="Coimbatore">Coimbatore</option>
            <option value="Erode">Erode</option>
            <option value="Vellore">Vellore</option>
          </select>
        </div>

        <div className="form-contents">
          <label htmlFor="">Division</label>
          <select name="" required>
            <option value="">Select Division</option>
            {division.map((divisionVal, index) => (
              <option key={index} value={divisionVal}>
                {divisionVal}
              </option>
            ))}
          </select>
        </div>
        <div className="form-contents">
          <label htmlFor="">Taluk</label>
          <select name="" required>
            <option value="">Select Taluk</option>
            {taluk.map((talukVal, index) => (
              <option key={index} value={talukVal}>
                {talukVal}
              </option>
            ))}
          </select>
        </div>
        <div className="subjects form-contents">
          <label htmlFor="">Subject1</label>
          <input
            type="text"
            placeholder="enter sub1 marks"
            name="sub1"
            value={sub1}
            onChange={(e) => handleInputChange(e, setSub1)}
          />
          {getPassFailMessage(sub1)}
        </div>

        <div className="subjects form-contents">
          <label htmlFor="">Subject2</label>
          <input
            type="text"
            placeholder="enter sub2 marks"
            name="sub2"
            value={sub2}
            onChange={(e) => handleInputChange(e, setSub2)}
          />
          {getPassFailMessage(sub2)}
        </div>

        <div className="subjects form-contents">
          <label htmlFor="">Subject3</label>
          <input
            type="text"
            placeholder="enter sub3 marks"
            name="sub3"
            value={sub3}
            onChange={(e) => handleInputChange(e, setSub3)}
          />
          {getPassFailMessage(sub3)}
        </div>

        <div className="subjects form-contents">
          <label htmlFor="">Subject4</label>
          <input
            type="text"
            placeholder="enter sub4 marks"
            name="sub4"
            value={sub4}
            onChange={(e) => handleInputChange(e, setSub4)}
          />
          {getPassFailMessage(sub4)}
        </div>

        <div className="subjects form-contents">
          <label htmlFor="">Subject5</label>
          <input
            type="text"
            placeholder="enter sub5 marks"
            name="sub5"
            value={sub5}
            onChange={(e) => handleInputChange(e, setSub5)}
          />
          {getPassFailMessage(sub5)}
        </div>

        <div className="subjects form-contents">
          <label htmlFor="">Subject6</label>
          <input
            type="text"
            placeholder="enter sub6 marks"
            name="sub6"
            value={sub6}
            onChange={(e) => handleInputChange(e, setSub6)}
          />
          {getPassFailMessage(sub6)}
        </div>
        <div className="mainTask-table-div">
          <table
            border={"1px"}
            cellPadding={"2px"}
            cellSpacing={"2px"}
            className="Main-task-table"
          >
            <thead>
              <tr>
                <th>Total Value</th>
                <th>Average</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{total}</td>
                <td>{avg && avg > 0 ? avg + "%" : ""}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="submit-container">
          <input type="submit" placeholder="submit" disabled={isInvalid} />
        </div>
      </form>
      <h1 className="acknowledge">
        {acknowledge && acknowledge
          ? `Your acknowledgement number is ${acknowledge}`
          : ""}
      </h1>

      <Link className="display-details" to="/display">
        Display Details
      </Link>
    </div>
  );
};

export default MainTask;
