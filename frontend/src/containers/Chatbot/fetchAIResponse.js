const fetchAIResponse = async (prompt) => {
  const apiKey = process.env.REACT_APP_OPEN_API_KEY;
  const apiEndpoint = 'https://api.openai.com/v1/chat/completions';

  const requestOptions = {
    method: 'POST',
    // API 요청의 헤더를 설정 파일명변경
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: 'gpt-3.5-turbo', // 사용할 AI 모델
      messages: [
        {
          role: 'user', // 메시지 역할을 user로 설정
          content: prompt, // 사용자가 입력한 메시지
        },
      ],
      temperature: 0.8, // 모델의 출력 다양성
      max_tokens: 512, // 응답받을 메시지 최대 토큰(단어) 수 설정
      top_p: 1, // 토큰 샘플링 확률을 설정
      frequency_penalty: 0.5, // 일반적으로 나오지 않는 단어를 억제하는 정도
      presence_penalty: 0.5, // 동일한 단어나 구문이 반복되는 것을 억제하는 정도
      stop: ['Human'], // 생성된 텍스트에서 종료 구문을 설정
    }),
  };
  // API 요청후 응답 처리
  try {
    const response = await fetch(apiEndpoint, requestOptions);
    const data = await response.json();
    const aiResponse = data.choices[0].message.content;
    return aiResponse;
  } catch (error) {
    console.error('OpenAI API 호출 중 오류 발생:', error);
    return 'OpenAI API 호출 중 오류 발생';
  }
};

export default fetchAIResponse;
