import React, { useState } from "react";
import "./Person.css";
import down from "./down-arrow.svg";
import deleteButton from "./delete-button.svg";
import editButton from "./edit-button.svg";
import up from "./up-arrow.svg";
import Modal from "react-bootstrap/Modal";

export default function Person(props) {
  const [read, setRead] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [isOpen, setIsOpen] = React.useState(false);

  const showModal = () => {
    setIsOpen(true);
  };

  const hideModal = () => {
    setIsOpen(false);
  };
  const readTrue = () => {
    setRead(false);
  };
  const readFalse = () => {
    setRead(true);
  };
  // const dataAge= document.getElementById("age").value

  const submitFormHandler = (event) => {
    event.preventDefault();

    const dataAge = document.getElementById("age").value;
    const dataGender = document.getElementById("gender").value;
    const dataCountry = document.getElementById("country").value;
    const dataDesc = document.getElementById("desc").value;
    let age;
    age =
      String(new Date().getFullYear() - dataAge) +
      "-" +
      String(props.data["dob"].slice(5, 7)) +
      "-" +
      String(props.data["dob"].slice(8, 10));
    console.log(age);

    const data = {
      id: props.data["id"],
      first: props.data["first"],
      last: props.data["last"],
      dob: age,
      gender: dataGender,
      email: "aidan.wang@example.com",
      picture: "https://randomuser.me/api/portraits/med/men/93.jpg",
      country: dataCountry,
      description: dataDesc,
    };
    props.editUser(data, props.data["id"]);
    setEditMode(false);
  };

  const deleteUserHandler = () => {
    props.deleteUser(props.data["id"]);
  };
  const editButtonHandler = () => {
    setEditMode((editMode) => !editMode);
  };
  return (
    <div className="person">
      <div className="person-heading">
        <div>
          <img src={props.data["picture"]} height="50px" width="50px" />
        </div>
        <div className="person-name">{props.data["first"]}</div>
        <div className="readButton">
          {read ? (
            <button onClick={readTrue}>
              <img src={up} height="10px" width="10px" />
            </button>
          ) : (
            <button onClick={readFalse}>
              <img src={down} height="10px" width="10px" />
            </button>
          )}
        </div>
      </div>
      {read && !editMode ? (
        <div>
          <div className="person-address">
            <div>
              <div>Age</div>
              <div>
                {new Date().getFullYear() -
                  new Date(props.data["dob"]).getFullYear()}
              </div>
            </div>
            <div>
              <div>Gender</div>
              <div>{props.data["gender"]}</div>
            </div>
            <div>
              <div>Country</div>
              <div>{props.data["country"]}</div>
            </div>
          </div>
          <div>
            <div>Description</div>
            <div>{props.data["description"]}</div>
          </div>
          <div className="button-edit-delete">
            <button onClick={showModal}>
              <img src={deleteButton} width="15px" height="15px" />
            </button>
            <button onClick={editButtonHandler}>
              <img src={editButton} width="15px" height="15px" />
            </button>
            <Modal show={isOpen} onHide={hideModal}>
              <Modal.Header>
                <Modal.Title>Are you Sure want to delete</Modal.Title>
              </Modal.Header>


              <Modal.Footer>
                <button onClick={hideModal}>Cancel</button>

                <button style={{backgroundColor:"red" , color:"bold" , padding:2+"px"+" "+7+"px" ,borderRadius:3+"px" }} onClick={deleteUserHandler}>Delete</button>
              </Modal.Footer>
            </Modal>
          </div>
        </div>
      ) : (
        ""
      )}
      {read && editMode ? (
        <div>
          <form className="person-address">
            <div>
              <label for="age">Age</label>
              <input
                id="age"
                type="number"
                defaultValue={
                  new Date().getFullYear() -
                  new Date(props.data["dob"]).getFullYear()
                }
              />
              {/* <div>{new Date().getFullYear()-new Date(props.data["dob"]).getFullYear()}</div> */}
            </div>
            <div>
              <label for="gender">Gender</label>
              <input
                id="gender"
                type="text"
                defaultValue={props.data["gender"]}
              />

              {/* <div>{props.data["gender"]}</div> */}
            </div>
            <div>
              <label for="country">Country</label>
              <input
                id="country"
                type="text"
                defaultValue={props.data["country"]}
              />

              {/* <div>{props.data['country']}</div> */}
            </div>
          </form>
          <div>
            <label for="desc">Description</label>
            <textarea
              id="desc"
              type="text"
              row="7"
              defaultValue={props.data["description"]}
            ></textarea>

            {/* <div>{props.data["description"]}</div> */}
          </div>
          <div className="button-edit-delete">
            <button onClick={editButtonHandler}>Cancel</button>
            <button onClick={submitFormHandler}>Edit</button>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
