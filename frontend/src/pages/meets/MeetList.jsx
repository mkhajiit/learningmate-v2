import axios from 'axios';

import React, { useCallback, useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { serverDomain } from '../../config/config';

function MeetList() {
  const location = useLocation();
  const [meetList, setMeetList] = useState({
    status: '',
    message: '',
    pageno: 1,
    pagesize: 10,
    total: 0,
    totalPage: 1,
    data: [],
  });

  const getMeetList = useCallback(async (no = 1, size = 10, category = null) => {
    const params = { no, size, category };
    const resp = await axios.get(`${serverDomain}/meets/meetList`, { params });
    // console.log(resp.data);
    setMeetList(resp.data);
  }, []);

  useEffect(() => {
    const category = new URLSearchParams(location.search).get('category');
    getMeetList(1, 10, category);
    // console.log(category);
  }, [getMeetList, location.search]);

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
                  {meetList.data.map((meetlist) => (
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
                              {meetlist.onoff === 0 ? '오프라인' : '온라인'}/{meetlist.category}
                            </p>
                            <p style={{ color: 'gray' }}>{meetlist.content}</p>
                          </div>
                        </td>
                      </tr>
                    </React.Fragment>
                  ))}
                </tbody>
                <tfoot>
                  {/* <tr>
                    <td colSpan={5} className='text-end'>
                      {login && (
                        <button className='btn btn-primary btn-sm' onClick={() => navigate('/insert')}>
                          새로운 모임 작성하기
                        </button>
                      )}
                    </td>
                  </tr> */}
                </tfoot>
              </table>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default MeetList;
