import React from 'react';
import {Card, Col, Image} from "react-bootstrap";

const OneItem = ({item}) => {
    return (
        <Col md={3}>
            <Card style={{width: 150, cursor: 'pointer'}} border={"light"}>
                <Image width={150} height={150} src={item.img}/>
                <div>
                    <div>
                        
                    </div>
                </div>
            </Card>
        </Col>
    );
};

export default OneItem;