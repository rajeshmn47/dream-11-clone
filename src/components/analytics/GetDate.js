import styled from "@emotion/styled";
import { getDisplayDate } from "../../utils/dateformat";

const Image = styled.img`
width: 30px;
border-radius:50%;
margin-right:15px;
`;

export function GetDate({ value }) {
    return (
        <>
            {getDisplayDate(value, 'i')}
        </>
    );
}

export default GetDate;