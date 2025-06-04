from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.chrome.options import Options
from webdriver_manager.chrome import ChromeDriverManager
from bs4 import BeautifulSoup
import json
import time

options = Options()
options.add_argument('--headless')
options.add_argument('--no-sandbox')
options.add_argument('--disable-dev-shm-usage')

driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()), options=options)

url = 'https://www.kfa.or.kr/national/?act=nt_man&position=&s_idx=6387&search_val=2024'
driver.get(url)

time.sleep(7)

html = driver.page_source
driver.quit()

soup = BeautifulSoup(html, 'html.parser')
match_rows = soup.select('.scheduleList li')
matches = []

for row in match_rows:
    try:
        date = row.select_one('.date').get_text(strip=True)
        teams = row.select_one('.tit').get_text(strip=True)
        result = row.select_one('.score').get_text(strip=True)
        location = row.select_one('.place').get_text(strip=True)

        match_id = teams.lower().replace(" ", "-").replace("대한민국", "kor")

        matches.append({
            "id": match_id,
            "date": date,
            "opponent": teams.replace("대한민국", "").strip(),
            "result": result,
            "location": location
        })
    except Exception as e:
        print("❗ 파싱 오류 발생:", e)

with open('matches2024.json', 'w', encoding='utf-8') as f:
    json.dump(matches, f, ensure_ascii=False, indent=2)

print(f"✅ 총 {len(matches)}개의 경기를 저장했습니다.")
