// chatList를 기반으로 채팅을 날짜별로 섹션으로 그룹화하는 함수
import dayjs from 'dayjs';

export default function makeSection(chatList) {
  const sections = {};

  chatList.forEach((chat) => {
    const sentTime = dayjs(chat.sentTime);
    const monthDate = sentTime.format('YYYY-MM-DD');

    if (Array.isArray(sections[monthDate])) {
      sections[monthDate].push(chat);
    } else {
      sections[monthDate] = [chat];
    }
  });

  return sections;
}
