import React, { useState } from "react";
import Helmet from "../components/Helmet/Helmet";
import { Container, Row, Col, Form, FormGroup } from "reactstrap";
import { Link, useNavigate } from "react-router-dom";
import "../styles/login.css";
import { createUserWithEmailAndPassword , updateProfile} from "firebase/auth";
import {ref, uploadBytesResumable, getDownloadURL} from "firebase/storage";
import {setDoc, doc} from "firebase/firestore";
import {auth } from "../firebase.config";
import {storage} from "../firebase.config";
import {db} from "../firebase.config";
import {toast} from "react-toastify";
import "../styles/login.css";
import {userNavigate} from "react-router-dom";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [file, setFile] = useState(null);
  const [ loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const Signup = async(e) => {
    e.preventDefault();
    setLoading(true);
    try {

      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
const storageRef = ref(storage, `images/${Date.now() + username}`)
const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on((error) => {
        toast.error(error.message)
      }, () => {
        getDownloadURL(uploadTask.snapshot.ref).then(async(downloadURL)=> {
          //update user profile
         await updateProfile(user, {
            displayName : username,
            photoURL : downloadURL,
          });

          //store user date in firestore database
          await setDoc(doc(db,'user', user.uid), {
            uid : user.uid,
            displayName : username,
            email,
            photoURl : downloadURL,
          })
        });
      });
      setLoading(false)
      toast.success('Account created')
      navigate('/login')
    }

    catch (error) {
      setLoading(false)
toast.error("something went wrong");
    }
  };
  return (
    <Helmet title="Signup">
      <section>
        <Container>
          <Row>
            <Col lg="6" className="m-auto text-center">
              <h3 className="fw-bold mb-4">Signup</h3>

              <Form className="auth__form" onSubmit = {Signup}>

              <FormGroup className="form__group">
                  <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </FormGroup>
                <FormGroup className="form__group">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </FormGroup>

                <FormGroup className="form__group">
                  <input
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </FormGroup>

                <FormGroup className="form__group">
                  <input
                    type="file"
                    value={file}
                    onChange={(e) => setFile(e.target.files[0])}
                  />
                </FormGroup>
                <button type="submit" className="buy__btn auth__btn">
                <Link to="/login">Create an account</Link>
                </button>
                <p>
                  Already have an account?
                  <Link to="/login">Login</Link>
                </p>
              </Form>
            </Col>
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default Signup;
