import styled from "styled-components";

export const BackgroundImage = styled.div`
    width: 100%;
    height: 100%;
    background-size: cover;
    background-position: center;
    background-image: ${({imageUrl}) => `url(${imageUrl})`}
`;

export const Body = styled.div`
    height: 90px;
    padding: 0 25xp;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border: 1px solid black;
    background-color: white;
    opacity: .7;
    position: absolute;

    h2 {
        font-weight: bold;
        text-transform: uppercase;
        margin: 0 6px 0;
        font-size: 22px;
        color: #4a4a4a;
    }

    p {
        font-weight: lighter;
        font-size: 16px;
    }
`;

export const DirectoryItemContainer = styled.div`
    min-width: 30%;
    height: 240px;
    flex: 1 1 auto;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid black;
    margin: 0 7.5px 15px;
    overflow: hidden;

    &:hover {
        cursor: pointer;

        & ${BackgroundImage} {
            transform: scale(1.1);
            transition: transform 6s cubic-bezier(.25, .45, .45, .95);
        }

        & ${Body} {
            opacity: .9;
        }
    }

    &:first-child {
        margin-right: .75px;
    }
    
    &:last-child {
        margin-left: 7.5px;
    }
`;