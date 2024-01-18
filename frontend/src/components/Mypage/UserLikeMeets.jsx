import React, { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { localDomain } from '../../config/config';

function UserLikeMeets() {
  const navigate = useNavigate();
  const userInfo = useSelector((state) => state.userInfo);
  const [userLikeMeets, setUserLikeMeets] = useState({
    status: '',
    message: '',
    pageno: 1,
    pagesize: 10,
    total: 0,
    totalPage: 1,
    data: [],
  });
  const login = useSelector((state) => state.auth.isAuth);

  const fetchUserLikeMeets = useCallback(
    async (no = 1, size = 10) => {
      try {
        const resp = await axios.get(`${localDomain}/likebutton/list/${userInfo.userId}`, { params: { no, size } });
        setUserLikeMeets({
          ...userLikeMeets,
          data: resp.data[0] || [], // 데이터가 없을 경우 빈 배열로 설정
        });
      } catch (error) {
        console.error('Error fetching liked meets:', error);
        setUserLikeMeets({
          ...userLikeMeets,
          data: [], // 에러 발생 시에도 빈 배열로 설정
        });
      }
    },
    [userInfo.userId, userLikeMeets],
  );

  useEffect(() => {
    fetchUserLikeMeets();
  }, [userInfo.userId]);

  return (
    <main id='main' style={{ background: 'white' }}>
      <section className='property-grid grid'>
        <div className='container'>
          <div className='row'>
            <div className='col-sm-10' style={{ marginLeft: '80px', marginTop: '40px' }}>
              <table className='table table-borderless'>
                <thead>
                  <tr>
                    {/* <th>타이틀</th>
                    <th>온오프라인</th>
                    <th>내용</th> */}
                    {/* <th>멤버 수</th> 추가 해야함 */}
                  </tr>
                </thead>
                <tbody>
                  {userLikeMeets.data.map((meetlist) => (
                    <React.Fragment key={meetlist.meet_id}>
                      <tr>
                        <td colSpan={3}>
                          <div
                            style={{
                              border: '1px solid #c0c0c0',
                              borderRadius: '10px',
                              paddingTop: '20px',
                              paddingLeft: '20px',
                              paddingBottom: '10px',
                              boxShadow: '1px 1px lightgray',
                              marginBottom: '20px',
                            }}
                          >
                            <h3
                              style={{
                                fontSize: '1.4rem',
                                marginBottom: '3px',
                                fontWeight: 'bold',
                              }}
                            >
                              <Link
                                to={`/detail/${meetlist.meet_id}`}
                                style={{
                                  textDecoration: 'none',
                                  color: 'inherit',
                                  transition: 'color 0.3s',
                                }}
                                onMouseOver={(e) => {
                                  e.target.style.color = '#848383';
                                }}
                                onMouseOut={(e) => {
                                  e.target.style.color = 'inherit';
                                }}
                              >
                                {meetlist.title}
                              </Link>
                            </h3>
                            <p style={{ color: '#4f4f4f', fontWeight: 600 }}>
                              {meetlist.onoff === 0 ? '오프라인' : '온라인'}
                            </p>
                            <p style={{ color: 'gray' }}>{meetlist.content}</p>
                          </div>
                        </td>
                      </tr>
                    </React.Fragment>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default UserLikeMeets;
