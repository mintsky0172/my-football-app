from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from webdriver_manager.chrome import ChromeDriverManager
from bs4 import BeautifulSoup
import json
import time

options = Options()
options.add_argument('--headless')
options.add_argument('--no-sandbox')
options.add_argument('--disable-dev-shm-usage')

driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()), options=options)

url = "https://www.kfa.or.kr/national/?act=nt_man&position=&s_idx=6387&search_val=2024"
driver.get(url)

try:
    WebDriverWait(driver, 10).until(
        EC.presence_of_element_located((By.CSS_SELECTOR, '.playerList li'))
    )
except:
    print("❗ 선수 명단 로딩 실패")
    driver.quit()
    exit()

html = driver.page_source
driver.quit()
soup = BeautifulSoup(html, 'html.parser')
players = []

player_items = soup.select('.playerList li')
print(f"🔍 {len(player_items)}명의 선수 항목을 감지했습니다.")

for item in player_items:
    try:
        name = item.select_one('.name').get_text(strip=True)
        position = item.select_one('.position').get_text(strip=True)
        birth = item.select_one('.birth').get_text(strip=True)
        team = item.select_one('.team').get_text(strip=True)

        img_tag = item.select_one('.thumb img')
        img_src = img_tag['src'] if img_tag else ''
        if img_src and not img_src.startswith('http'):
            img_src = 'https://www.kfa.or.kr' + img_src

        player_id = ''.join(e for e in name if e.isalnum())

        players.append({
            "id": player_id,
            "name": name,
            "position": position,
            "birth": birth,
            "team": team,
            "image": img_src
        })

    except Exception as e:
        print("❗ 파싱 오류:", e)

with open("players.json", "w", encoding="utf-8") as f:
    json.dump(players, f, ensure_ascii=False, indent=2)

print(f"✅ 총 {len(players)}명의 선수를 저장했습니다.")
