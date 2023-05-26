'use strict'
import {createPhone, getPhones, updatePhone, deletePhone} from '../http/phonesAPI.js';

window.addEventListener('DOMContentLoaded', () =>{


    //tabs
    const tabs = document.querySelectorAll('.tabheader__item'),
        tabsParent = document.querySelector('.tabheader__items'),
        tabContainer = document.querySelector('.tab__container');


    class Phone{

        constructor(id, src, picW, picH, phoneName, memorySize, price, ...classes){
            this.id = id,
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
                <div id=${this.id}>
                    <img src = ${this.src}  width = ${this.picW} height = ${this.picH} />
                    <p>${this.phoneName}<br>${this.memorySize}<br>${this.price}&#8381;</p>
                </div>
            `;
            return element;
        }
    }
    let gPhones = [];
    
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
    function createPhoneObject(_id, src, picW, picH, phoneName, memorySize, price){
            // console.log(_id)
            return new Phone(_id, src,
                picW,
                picH,
                phoneName,
                memorySize,
                price,
                "phone"
            )
                .returnElement()
                
    }
    function createTabs(phones){
        return new Tab('.tab__container', phones, 'tabcontent');
    }

    const idInput = document.getElementById('_id__input') 

    function dataParse(data, arr){
        const iphones = [], samsungs = [], honors = []; 

        data[0].forEach(phone => {
            // console.log(phone._id);
            iphones.push(createPhoneObject(
                phone._id,
                phone.src,
                phone.picW,
                phone.picH,
                phone.phoneName,
                phone.memorySize,
                phone.price))
        })
        data[1].forEach(phone => {
            samsungs.push(createPhoneObject(
                phone._id,
                phone.src,
                phone.picW,
                phone.picH,
                phone.phoneName,
                phone.memorySize,
                phone.price))
        })
        data[2].forEach(phone => {
            honors.push(createPhoneObject(
                phone._id,
                phone.src,
                phone.picW,
                phone.picH,
                phone.phoneName,
                phone.memorySize,
                phone.price))
        })
        iphones.forEach(phone => {
            phone.addEventListener('click', (e) => {
                e.preventDefault();
                let elemId = e.currentTarget.childNodes[1].id;
                console.log(e.currentTarget.childNodes[1].id);
                idInput.value = elemId;
            })
        })
        samsungs.forEach(phone => {
            phone.addEventListener('click', (e) => {
                e.preventDefault();
                let elemId = e.currentTarget.childNodes[1].id;
                console.log(e.currentTarget.childNodes[1].id);
                idInput.value = elemId;
            })
        })
        honors.forEach(phone => {
            phone.addEventListener('click', (e) => {
                e.preventDefault();
                let elemId = e.currentTarget.childNodes[1].id;
                console.log(e.currentTarget.childNodes[1].id);
                idInput.value = elemId;
            })
        })
        return [iphones, samsungs, honors];
    }

    const renderPhones = async () => {
        getPhones()
            .then(data => {
                const phones = dataParse(data);
                const phoneTabs = [createTabs(phones[0]), createTabs(phones[1]), createTabs(phones[2])];
                showTabContent(0, phoneTabs);
                gPhones = [...data[0], ...data[1], ...data[2]];
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
                formCreate.reset();
            }).catch(() => {
                
            }).finally(() => {
                formCreate.reset();
            });
    };

    function handleUpdateSubmit(event){
        event.preventDefault();

        const inputPhoneGroup = document.getElementById('phoneGroup_upd__input');
        const inputSrc = document.getElementById('src_upd__input');
        const inputPicW = document.getElementById('picW_upd__input');
        const inputPicH = document.getElementById('picH_upd__input');
        const inputPhoneName = document.getElementById('phoneName_upd__input');
        const inputMemorySize = document.getElementById('memorySize_upd__input');
        const inputPrice = document.getElementById('price_upd__input');
        
        console.log(gPhones);

        const phoneDefault = gPhones.filter(phone => phone._id == idInput.value)

        const data = {
            phoneGroup: inputPhoneGroup.value.length == 0 ? phoneDefault.phoneGroup : inputPhoneGroup.value,
            src : inputSrc.value.length == 0 ? phoneDefault.src : inputSrc.value,
            picW : inputPicW.value.length == 0 ? phoneDefault.picW : inputPicW.value,
            picH : inputPicH.value.length == 0 ? phoneDefault.picH : inputPicH.value,
            phoneName : inputPhoneName.value.length == 0 ? phoneDefault.phoneName : inputPhoneName.value,
            memorySize : inputMemorySize.value.length == 0 ? phoneDefault.memorySize : inputMemorySize.value,
            price: inputPrice.value.length == 0 ? phoneDefault.price : inputPrice.value
        }
        console.log(data);

        updatePhone(idInput.value, data)
            .then(data => {
                console.log(data);
                formUpdate.reset();
            }).catch(() => {
                
            }).finally(() => {
                formUpdate.reset();
            });
    };

    const formCreate = document.getElementById('create_phone__form');
    formCreate.addEventListener('submit', handlePostSubmit);

    const formUpdate = document.getElementById('update_phone__form');
    formUpdate.addEventListener('submit', handleUpdateSubmit);

    const deleteBtn = document.getElementById('delete__button');
    deleteBtn.addEventListener('click', (e) => {
        e.preventDefault();
        deletePhone(idInput.value);
    })
    
});