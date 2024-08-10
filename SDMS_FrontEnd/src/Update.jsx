import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

const Update = () => {
  const [acknowledgement, setAcknowledgement] = useState("");
  const [store, setStore] = useState({});
  const [displayDetails, setDisplayDetails] = useState(false);
  const [initialAck, setInitialAck] = useState("");

  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [date, setDate] = useState("");
  const [age, setAge] = useState("");
  const [address, setAddress] = useState("");
  const [district, setDistrict] = useState("");
  const [division, setDivision] = useState([]);
  const [taluk, setTaluk] = useState([]);
  const [selectedDivision, setSelectedDivision] = useState("");
  const [selectedTaluk, setSelectedTaluk] = useState("");
  const [sub1, setSub1] = useState("");
  const [sub2, setSub2] = useState("");
  const [sub3, setSub3] = useState("");
  const [sub4, setSub4] = useState("");
  const [sub5, setSub5] = useState("");
  const [sub6, setSub6] = useState("");
  const [total, setTotal] = useState();
  const [avg, setAvg] = useState();

  useEffect(() => {
    if (Object.keys(store).length > 0) {
      setName(store.name || "");
      setMobile(store.mobile || "");
      setDate(store.date ? store.date.split("T")[0] : "");
      setAddress(store.address || "");
      setDistrict(store.district || "");
      setSelectedDivision(store.division || "");
      setSelectedTaluk(store.taluk || "");
      setSub1(store.sub1 || "");
      setSub2(store.sub2 || "");
      setSub3(store.sub3 || "");
      setSub4(store.sub4 || "");
      setSub5(store.sub5 || "");
      setSub6(store.sub6 || "");
      setInitialAck(store.randomVal || "");
      setTotal(store.total || "");
      setAvg(store.avg || "");

      if (store.date) {
        const yearOfBirth = parseInt(store.date.split("-")[0]);
        const currentYear = new Date().getFullYear();
        setAge(currentYear - yearOfBirth);
      }

      // Call handleDistrict to set division and taluk values
      if (store.district) {
        handleDistrict({ target: { value: store.district } });
      }
    }
  }, [store]);
  // ! getting pass or fail msg
  const getPassFailMessage = (mark) => {
    if (mark === "") return "";

    // Check if mark is a valid number string
    if (!/^\d+$/.test(mark)) {
      return <span style={{ color: "red" }}>Not Valid</span>;
    }

    const numericMark = parseInt(mark, 10);

    // Check if numericMark is a valid number and falls within the valid range
    if (!isNumber(numericMark) || numericMark < 0 || numericMark > 100) {
      return <span style={{ color: "red" }}>Not Valid</span>;
    }

    if (numericMark < 35) {
      return <span style={{ color: "red" }}>Fail</span>;
    } else {
      return <span style={{ color: "green" }}>Pass</span>;
    }
  };

  const isNumber = (num) => {
    return typeof num === "number" && !isNaN(num);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!acknowledgement) {
      alert("Please enter an acknowledgement or mobile number.");
      return;
    }

    axios
      .get(`http://localhost:3000/updateByAcknowledge/${acknowledgement}`)
      .then((response) => {
        const dataValue = response.data;
        setStore(dataValue);
        setDisplayDetails(true);
      })
      .catch((err) => {
        console.error(err);
        alert("Error fetching data. Please try again.");
      });
  };

  const handleMainSubmit = async (e) => {
    e.preventDefault();

    const datePart = new Date(date).toISOString().split("T")[0];

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
      district,
      division: selectedDivision,
      taluk: selectedTaluk,
      sub1,
      sub2,
      sub3,
      sub4,
      sub5,
      sub6,
      total: totalValue,
      avg: averageValue,
    };

    try {
      await axios.put(
        `http://localhost:3000/saveUpdate/${acknowledgement}`,
        formValues
      );
      console.log("Form values sent to backend");
    } catch (error) {
      console.log(`Error on submitting form ${error}`);
    }
  };

  const handleDistrict = (e) => {
    setDistrict(e.target.value);
    switch (e.target.value) {
      case "Chennai":
        selectTV(
          ["Thiruuvottriyur", "Guindy", "Egmore", "Adyar"],
          ["Chennai North", "Chennai Central", "Chennai South"]
        );
        break;
      case "Vellore":
        selectTV(
          ["Tirupathur", "Arakonam", "Wallajah", "Gudiyatham", "Arcot"],
          ["Vellore", "Ranipet", "Tirupattur"]
        );
        break;
      case "Madurai":
        selectTV(
          ["Madurai North", "Madurai West", "Madurai East", "Madurai South"],
          ["Madurai", "Melur", "Usilampatti", "Thirumangalam"]
        );
        break;
      case "Coimbatore":
        selectTV(
          ["Sulur", "Mettupalayam", "Valparai", "Anamalai", "Madukarai"],
          ["Coimbatore North", "Pollachi", "Coimbatore South"]
        );
        break;
      case "Erode":
        selectTV(
          ["Bhavani", "Gobichettipalayam", "Perundurai", "Sathyamangalam"],
          ["Erode East", "Erode West", "Gobichettipalayam"]
        );
        break;
      default:
        setTaluk([]);
        setDivision([]);
        break;
    }
  };

  const selectTV = (t, v) => {
    setTaluk(t);
    setDivision(v);
  };
  // .remove-student
  return (
    <div className="Main-container-update">
      <header>
        <h1 className="heading">Update Details</h1>
      </header>
      <form onSubmit={handleSubmit} className="fetching-form">
        <div className="fetch-details">
          <input
            type="text"
            placeholder="Enter an acknowledgement or mobile"
            value={acknowledgement}
            className="fetching-input"
            onChange={(e) => setAcknowledgement(e.target.value)}
          />
          <button type="submit">Submit</button>
        </div>
      </form>
      {displayDetails && (
        <div className="changing-values">
          <form className="main-form" onSubmit={handleMainSubmit}>
            <div className="form-contents">
              <label>Name</label>
              <input
                type="text"
                placeholder="Enter name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="form-contents">
              <label>Mobile</label>
              <input
                type="tel"
                placeholder="Enter phone"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
              />
            </div>
            <div className="form-contents">
              <label>DOB</label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
              />
            </div>
            <div className="form-contents">
              <label>Age</label>
              <input
                className="age-input"
                type="number"
                placeholder="Enter Age"
                value={age}
                readOnly
              />
            </div>
            <div className="form-contents">
              <label>Address</label>
              <textarea
                cols="30"
                rows="10"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
              ></textarea>
            </div>
            <div className="form-contents">
              <label>District</label>
              <select value={district} onChange={handleDistrict} required>
                <option value="">--select district--</option>
                <option value="Chennai">Chennai</option>
                <option value="Madurai">Madurai</option>
                <option value="Coimbatore">Coimbatore</option>
                <option value="Erode">Erode</option>
                <option value="Vellore">Vellore</option>
              </select>
            </div>

            <div className="form-contents">
              <label>Division</label>
              <select
                value={selectedDivision}
                onChange={(e) => setSelectedDivision(e.target.value)}
                required
              >
                <option value="">--select Division--</option>
                {division.map((divisionVal) => (
                  <option key={divisionVal} value={divisionVal}>
                    {divisionVal}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-contents">
              <label>Taluk</label>
              <select
                value={selectedTaluk}
                onChange={(e) => setSelectedTaluk(e.target.value)}
                required
              >
                <option value="">--select Taluk--</option>
                {taluk.map((talukVal) => (
                  <option key={talukVal} value={talukVal}>
                    {talukVal}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-contents mark-inputs">
              <label>Subject 1</label>
              <input
                type="number"
                placeholder="Enter Subject 1 marks"
                value={sub1}
                onChange={(e) => setSub1(e.target.value)}
              />
              {getPassFailMessage(sub1)}
            </div>
            <div className="form-contents mark-inputs">
              <label>Subject 2</label>
              <input
                type="number"
                placeholder="Enter Subject 2 marks"
                value={sub2}
                onChange={(e) => setSub2(e.target.value)}
              />
              {getPassFailMessage(sub2)}
            </div>
            <div className="form-contents mark-inputs">
              <label>Subject 3</label>
              <input
                type="number"
                placeholder="Enter Subject 3 marks"
                value={sub3}
                onChange={(e) => setSub3(e.target.value)}
              />{" "}
              {getPassFailMessage(sub3)}
            </div>
            <div className="form-contents mark-inputs">
              <label>Subject 4</label>
              <input
                type="number"
                placeholder="Enter Subject 4 marks"
                value={sub4}
                onChange={(e) => setSub4(e.target.value)}
              />
              {getPassFailMessage(sub4)}
            </div>
            <div className="form-contents mark-inputs">
              <label>Subject 5</label>
              <input
                type="number"
                placeholder="Enter Subject 5 marks"
                value={sub5}
                onChange={(e) => setSub5(e.target.value)}
              />
              {getPassFailMessage(sub5)}
            </div>

            <div className="form-contents mark-inputs">
              <label>Subject 6</label>
              <input
                type="number"
                placeholder="Enter Subject 6 marks"
                value={sub6}
                onChange={(e) => setSub6(e.target.value)}
              />
              {getPassFailMessage(sub6)}
            </div>
            <div className="form-contents">
              <label>Total</label>
              <input
                className="total-input"
                type="number"
                value={total}
                readOnly
              />
            </div>
            <div className="form-contents">
              <label>Average</label>
              <input className="avg-input" type="number" value={avg} readOnly />
            </div>
            <button type="submit">Update</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Update;
