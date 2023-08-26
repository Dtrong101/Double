import React from 'react';
import useGetData from '../custom-hooks/useGetData';
import { Container, Row, Col } from 'reactstrap';
import { deleteDoc, doc } from 'firebase/firestore';
import { db } from '../firebase.config';
import { toast } from 'react-toastify';

const Users = () => {
    const { data: usersData, loading } = useGetData('users');

    const deleteUser = async id => {
        await deleteDoc(doc(db, 'users', id));
        toast.success('User deleted');
    };

    return (
        <section>
            <Container>
                <Row>
                    <Col lg='12'>
                        <h4 className='fw-bold'>Users</h4>
                    </Col>
                    <Col lg='12' className='pt-5'>
                        <table className='table'>
                            <thead>
                                <tr>
                                    <th>Image</th>
                                    <th>Username</th>
                                    <th>Email</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {loading ? (
                                    <tr>
                                        <td colSpan='4'>
                                            <h5 className='pt-5 fw-bold'>Loading ....</h5>
                                        </td>
                                    </tr>
                                ) : (
                                    usersData.map(user => (
                                        <tr key={user.id}>
                                            <td>
                                                <img src={user.photoURL} alt='' />
                                            </td>
                                            <td>{user.displayName}</td>
                                            <td>{user.email}</td>
                                            <td>
                                                <button
                                                    className='btn btn-danger'
                                                    onClick={() => {
                                                        deleteUser(user.id);
                                                    }}
                                                >
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </Col>
                </Row>
            </Container>
        </section>
    );
};

export default Users;