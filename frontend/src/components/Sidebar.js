import React, { useRef, useEffect } from "react";
import styled from 'styled-components';

const SideBarWrap = styled.div`
    z-index: 12; /* z-index 검색창이 10으로 설정되어 있어 10 이상으로 설정함 */
    padding: 12px;
    border-radius: 15px 0 0 15px;
    background-color: #FFFFFF;
    height: 100%;
    width: 50%;
    right: -55%;
    top: 0;
    position: absolute;
    transition: 0.5s ease;
    display: flex; /* 전체 사이드 바 모바일 뷰에 맞춰 가운데 정렬 */
    flex-direction: column; /* 요소들 열 기준 정렬 */
    justify-content: space-between; /* 세로 방향 가운데 정렬 */
    align-items: center; /* 가로 방향 가운데 정렬 */
    &.open {
        right: 0;
        transition: 0.5s ease;
    }
`;

const Overlay = styled.div`
    position: fixed;
    top: 0;
    width: 30%; /* 전체 너비의 절반 섞기 */
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5); /* 뒤쪽 흐리게 설정 */
    z-index: 5; /* 사이드바 이하 값으로 설정 */
    display: ${({ isOpen }) => (isOpen ? 'block' : 'none')}; /* 사이드바가 열렸을 때만 표시 */
    transition: opacity 0.5s ease; /* 애니메이션 자연스러움 추가 */
`;

const Menu = styled.li`
    text-align: center; /* 가로 방향 중앙 정렬 */
    margin-top: 10px;
    list-style: none;
    width: 100%;
`;

const HelloText = styled.p`
    text-align: center; /* 가로 방향 중앙 정렬 */
    white-space: pre-line; /* 인사말 어서오세요 */
    line-height: 1.5; /* 인사말 어서오세요와 사용자이름 분리 */
    margin-top: 60px; /* 글씨에 밑 여백 추가 */
`;

const Username = styled.span`
    color: #01CDCE; /* 사용자이름만 다른 색상으로 설정 */
    font-weight: 600;
`;

const Logout = styled.p`
    align-self: flex-start; /* 가로 방향 좌측 정렬 */
    margin-left: 15px; /* 좌측 여백 추가 */
    font-size: 11px;
    margin-bottom: 20px; /* 밑 여백 추가 */
`;

function Sidebar({ isOpen, setIsOpen }) {
    const outside = useRef();
    const username = "퀘변기원";

    useEffect(() => {
        document.addEventListener('mousedown', handlerOutside);
        return () => {
            document.removeEventListener('mousedown', handlerOutside);
        };
    }, []);

    const handlerOutside = (e) => {
        if (outside.current && !outside.current.contains(e.target)) {
            toggleSide();
        }
    };

    const toggleSide = () => {
        setIsOpen(false);
    };

    return (
        <>
            <Overlay isOpen={isOpen} onClick={toggleSide} />
            <SideBarWrap id="sidebar" ref={outside} className={isOpen ? 'open' : ''}>
                <HelloText className="hello">
                    어서오세요{`\n`}<Username>{username}</Username>님!
                </HelloText>
                <ul>
                    <Menu>추가 기능1</Menu>
                    <Menu>추가 기능2</Menu>
                    <Menu>추가 기능3</Menu>
                    <Menu>추가 기능4</Menu>
                </ul>
                <Logout className="logout">로그아웃</Logout>
            </SideBarWrap>
        </>
    );
}

export default Sidebar;
