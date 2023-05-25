'use strict'

const postData = async (url, data) => {
    //Поулчаем Promise, который возвращает fetch().
    const res = await fetch(url, {
        method: "POST",
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(data)
    });
    //Возвраащем Promise.
    return await res.json();
}

const getResources = async (url) => {
    //Поулчаем Promise, который возвращает fetch().
    const res = await fetch(url);

    if(!res.ok){
        throw new Error(`Could not fetch ${url}, status: ${res.status}`);
    }
    //Возвраащем Promise.
    return await res.json();
}

window.addEventListener('DOMContentLoaded', () =>{


    //tabs
    const tabs = document.querySelectorAll('.tabheader__item'),
        tabsParent = document.querySelector('.tabheader__items'),
        tabContainer = document.querySelector('.tab__container');


    class Phone{

        constructor(src, picW, picH, phoneName, memorySize, price, ...classes){
            this.src = src, 
            this.picW = picW,
            this.picH = picH,
            this.phoneName = phoneName,
            this.memorySize = memorySize,
            this.price = price,
            this.classes = classes;
        }

        returnElement(){
            const element = document.createElement('div');

            if (this.classes.length === 0){
                element.classList.add('phone');
            } else {
                this.classes.forEach(className => element.classList.add(className));
            }

            element.innerHTML = `
                <img src = ${this.src}  width = ${this.picW} height = ${this.picH} />
                <p>${this.phoneName}<br>${this.memorySize}<br>${this.price}&#8381;</p>
            `;
            return element;
        }
    }
    
    class Tab{
        constructor(parentSelector, phones, ...classes){
            this.parent = document.querySelector(parentSelector);
            this.phones = phones;
            this.classes = classes;
        }

        returnElement(){
            const element = document.createElement('div');

            if(this.classes.length === 0){
                element.classList.add('tabcontent');
            } else {
                this.classes.forEach(className => element.classList.add(className)); 
            }
            
            this.phones.forEach(phone =>{
                element.append(phone);
            })
            return element;
        }

        render(){
            this.parent.append(this.returnElement());
        }
    }   

    function deleteTabContent(){

        tabContainer.innerHTML = '';
        tabs.forEach(item => {
            item.classList.remove('active');
        })
    }

    function showTabContent(i = 0, phoneTabs){
        
        tabs[i].classList.add('active');
        phoneTabs[i].render();
    }
    function createPhone(src, picW, picH, phoneName, memorySize, price){
            return new Phone(src,
                picW,
                picH,
                phoneName,
                memorySize,
                price,
                "phone"
            ).returnElement()
    }
    function createTabs(phones){
        return new Tab('.tab__container', phones, 'tabcontent');
    }

    function dataParse(data, arr){
        const iphones = [], samsungs = [], honors = []; 

        data.iphones.forEach(phone => {
            iphones.push(createPhone(phone.src,
                phone.picW,
                phone.picH,
                phone.phoneName,
                phone.memorySize,
                phone.price))
        })
        data.samsungs.forEach(phone => {
            samsungs.push(createPhone(phone.src,
                phone.picW,
                phone.picH,
                phone.phoneName,
                phone.memorySize,
                phone.price))
        })
        data.honors.forEach(phone => {
            honors.push(createPhone(phone.src,
                phone.picW,
                phone.picH,
                phone.phoneName,
                phone.memorySize,
                phone.price))
        })
        return [iphones, samsungs, honors];
    }

    const getPhones = async () => {
        await getResources('http://localhost:8000/getPhonesData').
            then(data => {
                const phones = dataParse(data);
                const phoneTabs = [createTabs(phones[0]), createTabs(phones[1]), createTabs(phones[2])];
                showTabContent(0, phoneTabs);
                return phoneTabs;
            }).
                then((phoneTabs) => {
                    tabsParent.addEventListener('click', (e) => {
                        const target = e.target;
                        if(target && target.classList.contains('tabheader__item')){
                            tabs.forEach((item, i) =>{
                                if (target == item) {
                                    deleteTabContent();
                                    showTabContent(i, phoneTabs);
                                }
                            })
                        }
                    })
                })
    }

    getPhones();
    
    function handleSubmit(event){
        event.preventDefault();

        const inputName = document.getElementById('username__input');
        const inputAge = document.getElementById('age__input');

        const data = {
            username: inputName.value,
            age: inputAge.value
        }

        postData('http://localhost:8000/enter', data) 
                .then(data => {
                    console.log(data);
                    form.reset();
                }).catch(() => {
                    
                }).finally(() => {
                    form.reset();
                });
    };

    const form = document.getElementById('phones__form')
    form.addEventListener('submit', handleSubmit);
    
});