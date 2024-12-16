<div dir="rtl">
<h1>المشروع النهائي للتخرج</h1>
<p>عبارة عن منصة مصغرة لمشاركة الصور و مبنية ب Node.js و React.js و MongoDb</p>

<h2>طريقة تشغيل واجهة الخلفية</h2>
<ul>
  <li>تزيل ملفات المشروع و فك ضغطها</li>
  <li>دخول لمجلد الخادم <code>cd server</code></li>
  <li>تنزيل حزم و الوحدات الذي يحتاجها المشروع <code>npm install</code></li>
  <li>يمكنك تعديل على متغيرات البئة اذا اردت <code>.env</code></li>
  <li>انشاء مجلد uploads ان لم يكن موجود <code>mkdir uploads</code></li>
  <li>تشغيل الخادم <code>npm start</code></li>
</ul>

<h2>طريقة تشغيل واجهة الأمامية</h2>
<ul>
  <li>دخول لمجلد واجهة الواجهة الأمامية <code>cd client</code></li>
  <li>تنزيل حزم و الوحدات الذي يحتاجها المشروع <code>npm install</code></li>
  <li>يجب تعديل متغيرات البيئة حتى تتناسب مع شبكتك <code>.env</code></li>
  <li>تشغيل المشروع <code>npm start</code></li>
</ul>

<h2>تشغيل ملف public في الخادم</h2>
<ul>
  <li>دخول لمجلد الواجهة الأمامية <code>cd client</code></li>
  <li> استخراج مجلد build <code>npm run build</code></li>
  <li> نسخ محتويات مجلد build </li>
  <li> انتقال الى مجلد الخادم <code>cd ..\server</code></li>
  <li> دخول لمجلد public <code>cd public</code></li>
  <li> حذف متوى مجلد public و لصق ما نسخته من build</li>
</ul>
