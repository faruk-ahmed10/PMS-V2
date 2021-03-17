import React from 'react';
import Card from 'react-bootstrap/Card'
import {css} from "@emotion/css";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const __css_card = css(`
    min-height: 488px;
    @media only screen and (max-width: 984px) {
        margin-top: 15px;
        min-height: auto;
    }
`);

const __css_cardTitle1 = css(`
    padding: 20px 25px 0 25px;
    margin-bottom: 5px;
    font-family: poppinsSemiBold;
    font-size: 21px;
    color: #5d4ede;
    text-align: center;
    
    @media only screen and (max-width: 984px) {
        font-size: 16px;
        padding: 13px 13px 0 13px;
        width: 100%;
    }
`);

const __css_cardBody = css(`
    padding: 0;
    margin-top: 20px;
`);

const __css_cardText = css(`
    padding: 0 25px 20px 25px;
    @media only screen and (max-width: 984px) {
        padding: 0 15px 15px 15px;
    }
`);

const __css_calendar = css(`
    width: 100% !important;
    border: 0 !important;
    
    & .react-calendar__tile--active {
        background: #5d4ede !important
    }
`);

const __css_titleBox = css(`
    text-align: center;
    
    & .title {
        display: inline-block;
        padding: 11px;
        font-family: poppinsSemiBold;
        font-size: 21px;
        background: #5d4ede;
        color: #ffffff;
        width: 40%;
        text-align: center;
        border-bottom-left-radius: 50px;
        border-bottom-right-radius: 50px;
        
        @media only screen and (max-width: 984px) {
            font-size: 16px;
            padding: 13px;
            width: 85%;
        }
    }
`);

const CalendarCard = (): any => {
    return (
        <React.Fragment>
            <Card className={__css_card}>
                <div className={__css_titleBox}>
                    <div className={"title"}>
                        Calendar
                    </div>
                </div>

                <Card.Body className={__css_cardBody}>
                    <Card.Text className={__css_cardText}>
                        <Calendar
                            onChange={() => {}}
                            value={new Date()}
                            className={__css_calendar}
                        />
                    </Card.Text>
                </Card.Body>
            </Card>
        </React.Fragment>
    );
}

export default CalendarCard;
