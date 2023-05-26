'use strict'
import {createPhone, getPhones, updatePhone, deletePhone} from '../http/phonesAPI.js';

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
    function createPhoneObject(src, picW, picH, phoneName, memorySize, price){
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

        data[0].forEach(phone => {
            iphones.push(createPhoneObject(phone.src,
                phone.picW,
                phone.picH,
                phone.phoneName,
                phone.memorySize,
                phone.price))
        })
        data[1].forEach(phone => {
            samsungs.push(createPhoneObject(phone.src,
                phone.picW,
                phone.picH,
                phone.phoneName,
                phone.memorySize,
                phone.price))
        })
        data[2].forEach(phone => {
            honors.push(createPhoneObject(phone.src,
                phone.picW,
                phone.picH,
                phone.phoneName,
                phone.memorySize,
                phone.price))
        })
        return [iphones, samsungs, honors];
    }

    const renderPhones = async () => {
        getPhones()
            .then(data => {
                console.log(data);
                const phones = dataParse(data);
                const phoneTabs = [createTabs(phones[0]), createTabs(phones[1]), createTabs(phones[2])];
                showTabContent(0, phoneTabs);
                return phoneTabs;
            })
            .then((phoneTabs) => {
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

    renderPhones();
    
    function handlePostSubmit(event){
        event.preventDefault();

        const inputPhoneGroup = document.getElementById('phoneGroup__input');
        const inputSrc = document.getElementById('src__input');
        const inputPicW = document.getElementById('picW__input');
        const inputPicH = document.getElementById('picH__input');
        const inputPhoneName = document.getElementById('phoneName__input');
        const inputMemorySize = document.getElementById('memorySize__input');
        const inputPrice = document.getElementById('price__input');
        


        const data = {
            phoneGroup: inputPhoneGroup.value,
            src : inputSrc.value,
            picW : inputPicW.value,
            picH : inputPicH.value,
            phoneName : inputPhoneName.value,
            memorySize : inputMemorySize.value,
            price: inputPrice.value
        }
        console.log(data);

        createPhone(data)
            .then(data => {
                console.log(data);
                form.reset();
            }).catch(() => {
                
            }).finally(() => {
                form.reset();
            });
    };

    const form = document.getElementById('create_phone__form')
    form.addEventListener('submit', handlePostSubmit);
    
});