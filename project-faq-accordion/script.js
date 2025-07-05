const faq = [
    {
        "question": "Apa itu layanan kami?",
        "answer": "Layanan kami adalah platform digital yang menyediakan kemudahan akses terhadap berbagai kebutuhan pengguna, seperti informasi, pemesanan, dan konsultasi online."
    },
    {
        "question": "Bagaimana cara mendaftar akun?",
        "answer": "Klik tombol 'Daftar' di pojok kanan atas, lalu isi formulir dengan data diri Anda. Setelah itu, verifikasi email untuk mengaktifkan akun."
    },
    {
        "question": "Apakah layanan ini gratis?",
        "answer": "Sebagian besar fitur kami dapat diakses secara gratis. Namun, untuk fitur premium, pengguna perlu melakukan pembayaran sesuai paket yang dipilih."
    },
    {
        "question": "Bagaimana cara menghubungi customer service?",
        "answer": "Anda dapat menghubungi kami melalui email di support@layanan.com atau melalui fitur live chat di aplikasi."
    },
];

const accContainer = document.getElementById('accordion');
function createfaq(faq) {
    faq.forEach(items => {
        // content
        const accItem = document.createElement('div');
        accItem.classList.add('accordion-item');
        //header
        const accHeader = document.createElement('button');
        accHeader.classList.add('accordion-header', 'active');
        accHeader.textContent = items.question;
        //content for text
        const accContent = document.createElement('div');
        accContent.classList.add('accordion-content');
        const textContent = document.createElement('p');
        textContent.textContent = items.answer;

        //insert header and contentfortext include text into content
        accContent.appendChild(textContent);
        accItem.appendChild(accHeader);
        accItem.appendChild(accContent);
        //insert content into accordionContainer
        accContainer.appendChild(accItem);
    });
}

createfaq(faq);

const accHeaders = document.querySelectorAll('.accordion-header');
accHeaders.forEach(headers =>{
    headers.addEventListener('click', ()=>{
        headers.classList.toggle('active');
        const accContent = headers.nextElementSibling;

        if (headers.classList.contains('active')) {
            accContent.style.maxHeight = accContent.scrollHeight + 'px';
        }else{
            accContent.style.maxHeight = 0;
        }

        accHeaders.forEach(otherHeader=>{
            if (otherHeader !== headers && otherHeader.classList.contains('active') ) {
                otherHeader.classList.remove('active');
                otherHeader.nextElementSibling.style.maxHeight = 0;
            }
        });
    } );
})
