# Web Dev · การสร้างเว็บไซต์ (31900-0001)

เว็บสื่อการเรียนรู้แบบแอนิเมชันสำหรับรายวิชา **31900-0001 การสร้างเว็บไซต์** (ท1-ป4-น3 · หลักสูตร 2567)
แบ่งเป็น **5 หน่วยการเรียน** ตั้งแต่ “เว็บทำงานอย่างไร” จนถึงนำเว็บโครงงานของผู้เรียน (งานรายบุคคล) ขึ้น
**เซิร์ฟเวอร์และโดเมนของสถานศึกษาเอง** พร้อม HTTPS — เอกสารวิเคราะห์รายวิชาเป็นแผน **15 สัปดาห์** (หน่วยละ 3 สัปดาห์)

| หน่วย | ชื่อหน่วย | เนื้อหา | สัปดาห์ |
|---|---|---|---|
| [1](units/unit-1.html) | หลักการและโครงสร้างการทำงานของเว็บไซต์ | อินเทอร์เน็ต · URL · IP/Port · DNS · HTTP · HTTPS · Rendering · Static/Dynamic · WDLC | 1–3 |
| [2](units/unit-2.html) | การวิเคราะห์ความต้องการผู้ใช้และการออกแบบส่วนติดต่อผู้ใช้ | Persona · MoSCoW · Card sorting · UX laws · ลำดับสายตา · Grid · สี · ฟอนต์ไทย · Figma | 4–6 |
| [3](units/unit-3.html) | โปรแกรมจำลอง Web Server และการสร้างเว็บด้วย HTML | XAMPP · localhost · VS Code/Emmet · Semantic HTML · พาธ · รูป · ฟอร์ม GET/POST + PHP · SEO meta | 7–9 |
| [4](units/unit-4.html) | การตกแต่งเว็บด้วย CSS, Responsive และ JavaScript | CSS Specificity · Box model · Flexbox · Grid · Responsive · CSS Variables · JavaScript DOM | 10–12 |
| [5](units/unit-5.html) | การสร้างเว็บด้วย CMS การทดสอบ และการเผยแพร่เว็บไซต์ | WordPress · ทดสอบ · DNS · Linux/SSH · SFTP · Nginx · Let's Encrypt · SEO · ดูแลรักษา | 13–15 |

แต่ละหน่วยมี: จุดประสงค์ · แอนิเมชันทีละขั้น · กล่อง “เทคนิค / เจาะลึก Technical / เกร็ดความรู้ / พลาดบ่อย / ทริกมือโปร” · ใบงานแบบเช็กลิสต์ · แบบทดสอบเฉลยทันที · สรุป

## โครงสร้างไฟล์

```
index.html              หน้าแรก (การ์ด 5 หน่วย + ความก้าวหน้า + สิ่งที่ต้องเตรียม)
course.html             วิเคราะห์รายวิชา: 5 หน่วย · สมรรถนะประจำหน่วย · แผน 15 สัปดาห์ · การวัดผล
units/unit-1.html … unit-5.html
assets/css/style.css    ธีม auto/light/dark และคอมโพเนนต์ทั้งหมด
assets/js/main.js       เครื่องเล่นแอนิเมชัน แบบทดสอบ ใบงาน และแล็บโต้ตอบ (ไม่ใช้ไลบรารีภายนอก)
docs/course-analysis.md เอกสารวิเคราะห์รายวิชา (ฉบับข้อความ)
```

## เครื่องมือโต้ตอบในเว็บ

- **แอนิเมชันทีละขั้น** 27 ชุด — เล่น/หยุด/ย้อน/ปรับความเร็ว คลิกคำอธิบายเพื่อกระโดดไปขั้นนั้น
- **ตัวแยก URL** (หน่วย 1) · **วัดคอนทราสต์ WCAG** (หน่วย 2) · **Live HTML editor** (หน่วย 3)
- **คำนวณ Specificity · Flexbox playground · แล็บลากความกว้าง Responsive · เมนูมือถือ JS** (หน่วย 4)
- **ข้อมูลเซิร์ฟเวอร์ของฉัน** (หน่วย 5) — กรอกโดเมน ซับโดเมน IP และชื่อผู้ใช้ SSH แล้วคำสั่ง/ไฟล์ตั้งค่าทุกบล็อกในทุกหน่วยจะเปลี่ยนตาม และมีปุ่ม copy ทุกบล็อกโค้ด
- ปุ่มมุมขวาบน: **หยุด/เล่นโค้ดที่วิ่งบนพื้นหลัง** และ **สลับโหมดมืด/สว่าง** (จำค่าไว้ทุกหน้า)
- ความก้าวหน้า คะแนน เช็กลิสต์ และข้อมูลที่กรอก เก็บใน `localStorage` ของเบราว์เซอร์ผู้เรียนเท่านั้น

## นำขึ้นเซิร์ฟเวอร์ของสถานศึกษา

เว็บนี้เป็น Static ล้วน (HTML/CSS/JS) วางบนเว็บเซิร์ฟเวอร์ใดก็ได้ ตัวอย่าง Nginx:

```bash
# บนเซิร์ฟเวอร์
sudo git clone https://github.com/yutthipong-cpu/itrvc-web-development.git /var/www/webdev
```

```nginx
server {
    listen 80;
    server_name webdev.example.ac.th;   # เปลี่ยนเป็นโดเมนจริง
    root /var/www/webdev;
    index index.html;
    location / { try_files $uri $uri/ =404; }
    location ~ /\. { deny all; }        # ซ่อน .git
}
```

```bash
sudo nginx -t && sudo systemctl reload nginx
sudo certbot --nginx -d webdev.example.ac.th
```

อัปเดตเนื้อหาครั้งต่อไป: `cd /var/www/webdev && sudo git pull`
หรือใช้ Docker: `docker run -d -p 8080:80 -v /var/www/webdev:/usr/share/nginx/html:ro nginx`

## เพิ่ม/แก้แอนิเมชัน

```html
<figure class="anim" data-ms="4000">                  <!-- เวลาต่อขั้น (ms) -->
  <div class="stage">                                  <!-- พื้นที่ 16:9 ใช้พิกัด % -->
    <div class="actor c-blue" style="left:10%;top:50%" data-hl="1,3">…</div>
    <div class="bubble pop" style="left:50%;top:20%" data-only="2">แสดงเฉพาะขั้น 2</div>
    <div class="actor pop" style="left:80%;top:50%" data-in="3">แสดงตั้งแต่ขั้น 3</div>
    <div class="flyer" style="--x1:10%;--y1:50%;--x2:80%;--y2:50%" data-only="4">ข้อมูลวิ่ง</div>
  </div>
  <ol class="anim-steps"><li>คำอธิบายขั้นที่ 1</li> …</ol>    <!-- จำนวน li = จำนวนขั้น -->
</figure>
```

| แอตทริบิวต์ | ความหมาย |
|---|---|
| `data-in="3"` | แสดงตั้งแต่ขั้นที่ 3 |
| `data-only="2,4-6"` | แสดงเฉพาะขั้นที่ระบุ |
| `data-hl="1,3"` | ไฮไลต์ในขั้นที่ระบุ |
| `.flyer` + `--x1 --y1 --x2 --y2` | ข้อมูลวิ่งจากจุด 1 ไปจุด 2 |
| `<span class="v" data-v="domain">` | ข้อความที่เปลี่ยนตามข้อมูลเซิร์ฟเวอร์ที่ผู้เรียนกรอก (`domain`, `sub`, `ip`, `user`) |

กล่องเกร็ดความรู้: `<div class="nug tech|deep|fun|oops|pro"><p>…</p></div>`
