// 시간 계산해서 반환하는 함수
export const getTime = (diffTime) => {
  let time;
  if (diffTime < 1) {
    time = "1분전";
  } else if (diffTime < 2) {
    time = "2분전";
  } else if (diffTime < 3) {
    time = "2분전";
  } else if (diffTime < 4) {
    time = "4분전";
  } else if (diffTime < 5) {
    time = "5분전";
  } else if (diffTime < 10) {
    time = "10분전";
  } else if (diffTime < 20) {
    time = "20분전";
  } else if (diffTime < 30) {
    time = "30분전";
  } else if (diffTime < 60) {
    time = "1시간전";
  } else if (diffTime < 120) {
    time = "2시간전";
  } else if (diffTime < 180) {
    time = "3시간전";
  } else if (diffTime < 240) {
    time = "4시간전";
  } else if (diffTime < 300) {
    time = "5시간전";
  } else if (diffTime < 360) {
    time = "6시간전";
  } else if (diffTime < 420) {
    time = "7시간전";
  } else if (diffTime < 480) {
    time = "8시간전";
  } else if (diffTime < 540) {
    time = "9시간전";
  } else if (diffTime < 600) {
    time = "10시간전";
  } else if (diffTime < 660) {
    time = "11시간전";
  } else if (diffTime < 720) {
    time = "12시간전";
  } else if (diffTime < 780) {
    time = "13시간전";
  } else if (diffTime < 840) {
    time = "14시간전";
  } else if (diffTime < 900) {
    time = "15시간전";
  } else if (diffTime < 960) {
    time = "16시간전";
  } else if (diffTime < 1020) {
    time = "17시간전";
  } else if (diffTime < 1080) {
    time = "18시간전";
  } else if (diffTime < 1140) {
    time = "19시간전";
  } else if (diffTime < 1200) {
    time = "20시간전";
  } else if (diffTime < 1260) {
    time = "21시간전";
  } else if (diffTime < 1320) {
    time = "22시간전";
  } else if (diffTime < 1380) {
    time = "23시간전";
  } else if (diffTime < 1440) {
    time = "24시간전";
  } else if (diffTime < 2880) {
    time = "2일전";
  } else if (diffTime < 2880 + 1440 * 1) {
    time = "2일전";
  } else if (diffTime < 2880 + 1440 * 2) {
    time = "3일전";
  } else if (diffTime < 2880 + 1440 * 3) {
    time = "4일전";
  } else if (diffTime < 2880 + 1440 * 4) {
    time = "5일전";
  } else if (diffTime < 2880 + 1440 * 5) {
    time = "6일전";
  } else if (diffTime < 2880 + 1440 * 6) {
    time = "7일전";
  } else if (diffTime < 11520 * 2) {
    time = "2주전";
  } else if (diffTime < 11520 * 3) {
    time = "3주전";
  } else if (diffTime < 11520 * 4) {
    time = "1개월전";
  } else if (diffTime < 11520 * 4 * 2) {
    time = "2개월전";
  } else if (diffTime < 11520 * 4 * 3) {
    time = "3개월전";
  } else if (diffTime < 11520 * 4 * 4) {
    time = "4개월전";
  } else if (diffTime < 11520 * 4 * 5) {
    time = "5개월전";
  } else if (diffTime < 11520 * 4 * 6) {
    time = "6개월";
  } else if (diffTime < 11520 * 4 * 7) {
    time = "7개월";
  }
  return time;
};
