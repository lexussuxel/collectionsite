import React, {useContext} from 'react';
import {Button, Row} from "react-bootstrap";
import {COLLECTIONS_ROUTE} from "../util/constants";
import {useNavigate} from "react-router-dom";
import {Context} from "../index";

const OneCollection = ({collection, index, deleteCollections, id}) => {
    const {user} = useContext(Context);
    const navigate = useNavigate();
    return (
        <Row>
            <div className="d-grid gap-2">
                <hr style={{color: "black", height: 2}}/>
                <Button variant="secondary" onClick={() => navigate(COLLECTIONS_ROUTE+`/${collection.id}`)}>{(index + 1) + ". " + collection.name}</Button>
                <p>{collection.description}</p>


            </div>

            {(Number(id) === Number(user.user.id))?
                <div>
                    <Button className="float-end p-lg-0" variant="link" style={{color: "red"}} size="sm" onClick={ () =>deleteCollections(collection.id)}>delete collection</Button>
                    <br/>
                </div>:null}
        </Row>
    );
};

export default OneCollection;