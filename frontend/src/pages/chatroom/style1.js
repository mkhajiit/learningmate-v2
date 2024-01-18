import styled from '@emotion/styled';

export const RightMenu = styled.div`
  float: right;
`;

export const Header = styled.header`
  height: 80px;
  background: #46c4ee;
  color: #ffffff;
  box-shadow: 0 1px 0 0 rgba(255, 255, 255, 0.1);
  padding: 5px;
  text-align: center;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end; /* 수정된 부분 */
`;

export const ProfileImg = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 20%;
  margin-right: 20px;
`;

export const ProfileModal = styled.div`
  display: flex;
  padding: 15px;

  & img {
    display: flex;
  }

  & > div {
    display: flex;
    flex-direction: column;
    margin-left: 10px;
  }

  & #profile-name {
    font-weight: bold;
    display: inline-flex;
  }

  & #profile-active {
    font-size: 13px;
    display: inline-flex;
  }
`;

export const LogOutButton = styled.button`
  border: none;
  width: 100%;
  border-top: 1px solid rgb(29, 28, 29);
  background: transparent;
  display: block;
  height: 33px;
  padding: 5px 20px 5px;
  outline: none;
  cursor: pointer;
  &:hover {
    background-color: rgba(143, 125, 125, 0.2);
  }
`;

export const WorkspaceWrapper = styled.div`
  display: flex;
  flex: 1;
`;

export const Workspaces = styled.div`
  width: 65px;
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  background: #46c4ee;
  vertical-align: top;
  text-align: center;
  padding: 15px 0 0;
`;

export const Channels = styled.nav`
  width: 200px;
  display: flex;
  flex-direction: column;
  background: #46c4ee;
  color: rgb(255, 255, 255);
  vertical-align: top;

  & a {
    padding-left: 52px;
    color: inherit;
    text-decoration: none;
    height: 30px;
    line-height: 30px;
    display: flex;
    align-items: center;

    &.selected {
      color: white;
    }
  }

  & .bold {
    color: white;
    font-weight: bold;
  }

  & .count {
    margin-left: auto;
    background: #cd2553;
    border-radius: 16px;
    display: inline-block;
    font-size: 12px;
    font-weight: 700;
    height: 18px;
    line-height: 18px;
    padding: 0 9px;
    color: white;
    margin-right: 16px;
  }

  & h2 {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 36px;
    line-height: 36px;
    margin: 0;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    font-size: 15px;
  }

  & a:hover {
    background-color: rgba(143, 125, 125, 0.2);
    border-radius: 5px;
  }
`;
export const WorkspaceName = styled.button`
  height: 64px;
  line-height: 64px;
  border: none;
  width: 100%;
  text-align: left;
  border-top: 1px solid rgb(255, 255, 255);
  border-bottom: 1px solid rgb(255, 255, 255);
  font-weight: 900;
  font-size: 24px;
  background: transparent;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  padding: 0;
  padding-left: 16px;
  margin: 0;
  color: white;
  cursor: pointer;
`;

export const MenuScroll = styled.div`
  height: calc(100vh - 102px);
  overflow-y: auto;
`;

export const WorkspaceModal = styled.div`
  padding: 10px 0 0;

  & h2 {
    padding-left: 20px;
  }

  & > button {
    width: 100%;
    height: 28px;
    padding: 4px;
    border: none;
    background: transparent;
    border-top: 1px solid rgb(255, 255, 255);
    cursor: pointer;

    &:last-of-type {
      border-bottom: 1px solid rgb(255, 255, 255);
    }
  }
`;

export const Chats = styled.div`
  flex: 1;
  padding-left: 20px;
  display: flex;
  flex-direction: column; /* 세로 방향으로 정렬 */
`;

export const ChannelTitleBox = styled.div`
  display: flex;
  background-color: #ffffff;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  color: gray;
  font-weight: bold;
  margin-bottom: 10px;
`;

export const ChannelTitle = styled.div`
  margin-top: 10px; /* 가로로 띄우기 위한 여백 */
`;

export const AddButton = styled.button`
  color: white;
  font-size: 24px;
  display: inline-block;
  width: 40px;
  height: 40px;
  background: transparent;
  border: none;
  cursor: pointer;
`;

export const WorkspaceButton = styled.button`
  display: inline-block;
  width: 40px;
  height: 40px;
  border-radius: 10px;
  background: white;
  border: 3px solid #ffffff;
  margin-bottom: 15px;
  font-size: 18px;
  font-weight: 700;
  color: black;
  cursor: pointer;
`;
