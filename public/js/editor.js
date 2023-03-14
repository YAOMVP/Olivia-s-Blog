const blogTitleField = document.querySelector(".title");
const articleField = document.querySelector(".article");

//banner 
const bannerImage = document.querySelector("#banner-upload");
const banner = document.querySelector(".banner");
let bannerPath;

const publishBtn = document.querySelector(".publish-btn");
const uploadInput = document.querySelector("#image-upload");

bannerImage.addEventListener("change", () => {
    uploadImage(bannerImage, "banner");
});

uploadInput.addEventListener("change", () => {
    uploadImage(uploadInput, "image");
});

const uploadImage = (uploadFile, uploadType) => {
    const [file] = uploadFile.files;
    if (file && file.type.includes("image")) { //make sure the file is image only
        const formdata = new FormData();
        formdata.append("image", file);

        fetch("/upload", {
                method: "post",
                body: formdata
            }).then(res => res.json())
            .then(data => {
                if (uploadType == "image") {
                    addImage(data, file.name);
                } else {
                    bannerPath = `${location.origin}/${data}`; //Once got image url set banner's background image
                    banner.style.backgroundImage = `url("${bannerPath}")`;
                }
            })
    } else {
        alert("Upload Image Only");
    }
}

const addImage = (imagepath, alt) => {
    let curPos = articleField.selectionStart;
    let textToInsert = `\r![${alt}](${imagepath})\r`;
    articleField.value = articleField.value.slice(0, curPos) + textToInsert + articleField.value.slice(curPos);
}

let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];


publishBtn.addEventListener("click", () => {
    if (articleField.value.length && blogTitleField.value.length) {
        let docName;
        if (blogID[0] == "editor") {
            //generating id
            let letters = "jfljdskhjdgfdsgffdsloremdjfsaljf";
            let blogTitle = blogTitleField.value.split(" ").join("-"); //replace the spaces with "-" in the title
            let id = "";
            for (let i = 0; i < 4; i++) {
                id += letters[Math.floor(Math.random() * letters.length)]
            }
            //Seting up docName
            docName = `${blogTitle} - ${id}`;
        } else {
            docName = decodeURI(blogID[0]);
        }

        let date = new Date(); //Publishing the date

        //Access firestore with db variable
        db.collection("blogs").doc(docName).set({
                title: blogTitleField.value,
                article: articleField.value,
                bannerImage: bannerPath,
                publishedAt: `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()} `,
                author: auth.currentUser.email.split("@")[0] // this will return ["example","gmail.com"]
            })
            .then(() => {
                location.href = `/${docName}`;
            })
            .catch((err) => {
                console.log(err);
            })
    }
});

//checking for user logged in or not

auth.onAuthStateChanged((user) => {
    if (!user) {
        location.replace("/admin") //re-direct to admin route if no one is logged in
    }
})

//checking for existing blog edits
let blogID = location.pathname.split("/");
blogID.shift(); //It will remove the first element,which is empty from the array

if (blogID[0] != "editor") {
    //We are in existing blog edit route
    let docRef = db.collection("blogs").doc(decodeURI(blogID[0]));
    docRef.get().then((doc) => {
        if (doc.exists) {
            let data = doc.data();
            bannerPath = data.bannerImage;
            banner.style.backgroundImage = `url(${bannerPath})`;
            blogTitleField.value = data.title;
            articleField.value = data.article;
        } else {
            location.replace("/");
        }
    })
}