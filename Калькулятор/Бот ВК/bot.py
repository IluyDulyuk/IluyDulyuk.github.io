import vk_api, json
from vk_api.longpoll import VkLongPoll, VkEventType
import openpyxl 
from vk_api.upload import VkUpload
from vk_api.utils import get_random_id
import os



session = vk_api.VkApi(token="vk1.a.CnrPBkEkuVA2Y0HjtAZX7x6Pu8GT_oyv2wk4QWu81ULSoa91FbTQu9l-b65InTPoA7Bod1xMkGiC2R8oR0ienMwzDb9FvZhjxirIvimFSS5m_NGMRqjTkxuJMbJEXxkwnY1qdjj5E_QoYXIuiMDP_cz_zGtKf7LksIwE1vQXtk5YU9eUuZwiNTRowABuQkR45U3PZSRjuwUkes6U4mdKKQ")
session_id = session.get_api()
longpool = VkLongPoll(session)
upload = VkUpload(session)

wb = openpyxl.reader.excel.load_workbook(filename = "Prays.xlsx")


def get_but(text, color):
    return {
                "action": {
                    "type": "text",
                    "payload": "{\"button\": \"" + "1" + "\"}",
                    "label": f"{text}"
                },
                "color": f"{color}"
            }



 

keyboard = {
    "one_time" : True,
    "buttons" : [
        [get_but('Жидкости', 'positive'), get_but('Одноразовые устройства', 'positive')],
        [get_but('Девайсы', 'positive'), get_but('Комплектующие', 'positive')]
    ]
}
keyboard = json.dumps(keyboard, ensure_ascii = False).encode('utf-8')
keyboard = str(keyboard.decode('utf-8'))








keyboard_zizha = {
    "one_time" : True,
    "buttons" : [
        [get_but('20mg', 'positive'), get_but('20mg HARD', 'positive')],
        [get_but('Любая', 'positive')]
    ]
}
keyboard_zizha = json.dumps(keyboard_zizha, ensure_ascii = False).encode('utf-8')
keyboard_zizha = str(keyboard_zizha.decode('utf-8'))


keyboard_complect = {
    "one_time" : True,
    "buttons" : [
        [get_but('Испарители', 'positive'), get_but('Картриджи', 'positive')]
    ]
}
keyboard_complect = json.dumps(keyboard_complect, ensure_ascii = False).encode('utf-8')
keyboard_complect = str(keyboard_complect.decode('utf-8'))




keyboard_end = {
    "one_time" : True,
    "buttons" : [
        [get_but('В начало', 'positive'), get_but('Пока', 'positive')]
    ]
}
keyboard_end = json.dumps(keyboard_end, ensure_ascii = False).encode('utf-8')
keyboard_end = str(keyboard_end.decode('utf-8'))


def photo_check(user_id, msg, key,img):
    attachment = []
    for i in img:
        if os.path.exists(i):
            upload_image = upload.photo_messages(photos=i)[0]
            attachment.append(f'photo{upload_image["owner_id"]}_{upload_image["id"]}')
    if len(attachment) != 0:
        photo_send(user_id, msg, key, attachment)
    else:
        sender(user_id, msg, key)

def photo_send(user_id, msg, key, attachment):
    session.method('messages.send', {'user_id' : user_id, 'message' : msg, 'random_id' : 0, 'keyboard' : key, "attachment": ",".join(attachment)})


def sender(user_id, msg, key):
    session.method('messages.send', {'user_id' : user_id, 'message' : msg, 'random_id' : 0, 'keyboard' : key})


def zizha_choice(user_id):
    sender(user_id, "Жидкость какой крепости предпочитаете?", keyboard_zizha)

def complect_choice(user_id):
    sender(user_id, "Что именно вы хотите из комплектующих?", keyboard_complect)

def all_zizha(user_id):
    wb.active = 0
    sheet = wb.active

    res = {}
    arr = []

    for i in range(2, 600):
        if sheet["A" + str(i)].value != None:
            arr.append(str(sheet["D"+str(i+1)].value))
            b = i+1
            # for b in range(i+1, i+20):
            while sheet["B" + str(b)].value != None:
                if str(sheet["B" + str(b)].value) != "Вкусы":
                    if str(sheet["C" + str(b)].value).strip() == "Есть":
                        arr.append(sheet["B"+str(b)].value)
                else:
                    break
                b += 1
            res[sheet["A" + str(i)].value] = arr
            arr = []

    res = dict(sorted(res.items(), key=lambda x: x[1]))
    res_hard = {}
    res_lite = {}

    string = "20mg HARD"
    string2 = "50mg"
    for key in res:
        if (string in key) or (string2 in key):
            res_hard[key] = res[key]
        else:
            res_lite[key] = res[key]

    fin_str = ""
    fin_str_arr = []
    count = 0

    for key in res:
        if(len(res[key])> 1):
            count+=1        
            fin_str += f"{key} --> {res[key][0]} РУБ\n"
            for i in res[key][1:]:
                fin_str += f'•{i}\n'
            fin_str += "\n---------------------\n"
            if count == 1:
                fin_str_arr.append(fin_str)
                fin_str = ""
                count = 0

    if(fin_str) != "":
        fin_str_arr.append(fin_str)


    fin_count = 0
    img = []
    fin_string = ""

    if (fin_str_arr != []):
        for i in fin_str_arr:
            string_find = i.replace(" ","")
            index = string_find.find("mg") - 2
            img.append(f"./img/{string_find[0:index]}.jpg")
            fin_count +=1
            fin_string += i
            if fin_count == 5: 
                sender(user_id, "\n---------------------\n", keyboard_end)  
                sender(user_id, "Подождите, загружаем фото...", keyboard_end)           
                photo_check(user_id, fin_string[:-23], keyboard_end, img)
                img = []
                fin_count = 0
                fin_string = ""
        if fin_string != '':
            sender(user_id, "\n---------------------\n", keyboard_end) 
            sender(user_id, "Подождите, загружаем фото...", keyboard_end)
            fin_string = fin_string[:-23]
            photo_check(user_id, fin_string, keyboard_end, img)
    else:
        sender(user_id, "Извините, такой жидкости нет(", keyboard_end)
    

def zizha_hard(user_id):
    wb.active = 0
    sheet = wb.active

    res = {}
    arr = []

    for i in range(2, 600):
        if sheet["A" + str(i)].value != None:
            arr.append(str(sheet["D"+str(i+1)].value))
            b = i+1
            # for b in range(i+1, i+20):
            while sheet["B" + str(b)].value != None:
                if str(sheet["B" + str(b)].value) != "Вкусы":
                    if str(sheet["C" + str(b)].value).strip() == "Есть":
                        arr.append(sheet["B"+str(b)].value)
                else:
                    break
                b += 1
            res[sheet["A" + str(i)].value] = arr
            arr = []

    res = dict(sorted(res.items(), key=lambda x: x[1]))
    res_hard = {}
    res_lite = {}

    string = "20mg HARD"
    string2 = "50mg"
    for key in res:
        if (string in key) or (string2 in key):
            res_hard[key] = res[key]
        else:
            res_lite[key] = res[key]

    fin_str = ""
    fin_str_arr = []
    count = 0
    img = []

    for key in res_hard:
        if(len(res[key])> 1):
            count+=1        
            fin_str += f"{key} --> {res_hard[key][0]} РУБ\n"
            for i in res_hard[key][1:]:
                fin_str += f'•{i}\n'
            fin_str += "\n---------------------\n"
            if count == 1:
                fin_str_arr.append(fin_str)
                fin_str = ""
                count = 0

    if(fin_str) != "":
        fin_str_arr.append(fin_str)


    fin_count = 0
    img = []
    fin_string = ""

    if (fin_str_arr != []):
        for i in fin_str_arr:
            string_find = i.replace(" ","")
            index = string_find.find("mg") - 2
            img.append(f"./img/{string_find[0:index]}.jpg")
            fin_count +=1
            fin_string += i
            if fin_count == 5: 
                sender(user_id, "\n---------------------\n", keyboard_end)  
                sender(user_id, "Подождите, загружаем фото...", keyboard_end)           
                photo_check(user_id, fin_string[:-23], keyboard_end, img)
                img = []
                fin_count = 0
                fin_string = ""
        if fin_string != '':
            sender(user_id, "\n---------------------\n", keyboard_end) 
            sender(user_id, "Подождите, загружаем фото...", keyboard_end)
            fin_string = fin_string[:-23]
            photo_check(user_id, fin_string, keyboard_end, img)
    else:
        sender(user_id, "Извините, такой жидкости нет(", keyboard_end)
    

def zizha_lite(user_id):
    wb.active = 0
    sheet = wb.active

    res = {}
    arr = []

    for i in range(2, 600):
        if sheet["A" + str(i)].value != None:
            arr.append(str(sheet["D"+str(i+1)].value))
            b = i+1
            # for b in range(i+1, i+20):
            while sheet["B" + str(b)].value != None:
                if str(sheet["B" + str(b)].value) != "Вкусы":
                    if str(sheet["C" + str(b)].value).strip() == "Есть":
                        arr.append(sheet["B"+str(b)].value)
                else:
                    break
                b += 1
            res[sheet["A" + str(i)].value] = arr
            arr = []

    res = dict(sorted(res.items(), key=lambda x: x[1]))
    res_hard = {}
    res_lite = {}

    string = "20mg HARD"
    string2 = "50mg"
    for key in res:
        if (string in key) or (string2 in key):
            res_hard[key] = res[key]
        else:
            res_lite[key] = res[key]

    fin_str = ""
    fin_str_arr = []
    count = 0
    

    for key in res_lite:
        if(len(res[key])> 1):
            count+=1        
            fin_str += f"{key} --> {res_lite[key][0]} РУБ\n"
            for i in res_lite[key][1:]:
                fin_str += f'•{i}\n'
            fin_str += "\n---------------------\n"
            if count == 1:
                fin_str_arr.append(fin_str)
                fin_str = ""
                count = 0

    if(fin_str) != "":
        fin_str_arr.append(fin_str)


    fin_count = 0
    img = []
    fin_string = ""

    if (fin_str_arr != []):
        for i in fin_str_arr:
            string_find = i.replace(" ","")
            index = string_find.find("mg") - 2
            img.append(f"./img/{string_find[0:index]}.jpg")
            fin_count +=1
            fin_string += i
            if fin_count == 5: 
                sender(user_id, "\n---------------------\n", keyboard_end)  
                sender(user_id, "Подождите, загружаем фото...", keyboard_end)           
                photo_check(user_id, fin_string[:-23], keyboard_end, img)
                img = []
                fin_count = 0
                fin_string = ""
        if fin_string != '':
            sender(user_id, "\n---------------------\n", keyboard_end) 
            sender(user_id, "Подождите, загружаем фото...", keyboard_end)
            fin_string = fin_string[:-23]
            photo_check(user_id, fin_string, keyboard_end, img)
    else:
        sender(user_id, "Извините, такой жидкости нет(", keyboard_end)
        # sender(user_id, fin_str, keyboard_end)
        



def disposable(user_id):
    wb.active = 1
    sheet = wb.active

    res = {}
    arr = []

    for i in range(7, 600):
        if sheet["A" + str(i)].value != None:
            arr.append(str(sheet["D"+str(i+1)].value))
            b = i+1
            # for b in range(i+1, i+20):
            while sheet["B" + str(b)].value != None:
                if str(sheet["B" + str(b)].value) != "Вкусы":
                    if str(sheet["C" + str(b)].value).strip() == "Есть":
                        arr.append(sheet["B"+str(b)].value)
                else:
                    break
                b += 1
            res[sheet["A" + str(i)].value] = arr
            arr = []


    res = dict(sorted(res.items(), key=lambda x: x[1]))
    fin_str = ""
    fin_str_arr = []
    count = 0

    for key in res:
        if(len(res[key])> 1):
            count+=1        
            fin_str += f"{key} --> {res[key][0]} РУБ\n"
            for i in res[key][1:]:
                fin_str += f'•{i}\n'
            fin_str += "\n---------------------\n"
            fin_str += "\n\n"
            if count == 1:
                fin_str_arr.append(fin_str)
                fin_str = ""
                count = 0

    if(fin_str) != "":
        fin_str_arr.append(fin_str)

    fin_count = 0
    img = []
    fin_string = ""
    if (fin_str_arr != []):
        for i in fin_str_arr:
            string_find = i.replace(" ","")
            index = string_find.find("20mg")
            img.append(f"./img/{string_find[0:index]}.jpg")
            fin_count +=1
            fin_string += i
            if fin_count == 5: 
                sender(user_id, "\n---------------------\n", keyboard_end)  
                sender(user_id, "Подождите, загружаем фото...", keyboard_end)           
                photo_check(user_id, fin_string[:-24], keyboard_end, img)
                img = []
                fin_count = 0
                fin_string = ""
        if fin_string != '':
            sender(user_id, "\n---------------------\n", keyboard_end) 
            sender(user_id, "Подождите, загружаем фото...", keyboard_end)
            fin_string = fin_string[:-24]
            photo_check(user_id, fin_string, keyboard_end, img)
    else:
        sender(user_id, "Извините, таких одноразовых устройств нет(", keyboard_end)
    

def device(user_id):
    wb.active = 2
    sheet = wb.active

    res = {}
    arr = []

    for i in range(7, 600):
        if sheet["A" + str(i)].value != None:
            arr.append(str(sheet["D"+str(i+2)].value))
            b = i+2
            # for b in range(i+1, i+20):
            while sheet["B" + str(b)].value != None:
                if str(sheet["B" + str(b)].value) != "Вкусы":
                    if str(sheet["C" + str(b)].value).strip() == "Есть":
                        arr.append(sheet["B"+str(b)].value)
                else:
                    break
                b += 1
            res[sheet["A" + str(i)].value] = arr
            arr = []

    res = dict(sorted(res.items(), key=lambda x: x[1]))
    fin_str = ""
    fin_str_arr = []
    count = 0

    for key in res:
        if(len(res[key])> 1):
            count+=1        
            fin_str += f"{key} --> {res[key][0]} РУБ\n"
            for i in res[key][1:]:
                fin_str += f'•{i}\n'
            fin_str += "\n---------------------\n"
            fin_str += "\n\n"
            if count == 1:
                fin_str_arr.append(fin_str)
                fin_str = ""
                count = 0

    if(fin_str) != "":
        fin_str_arr.append(fin_str)

    fin_count = 0
    img = []
    fin_string = ""
    if (fin_str_arr != []):
        for i in fin_str_arr:
            string_find = i.replace(" ","")
            index = string_find.find("-->")
            img.append(f"./img/{string_find[0:index]}.jpg")
            fin_count +=1
            fin_string += i
            if fin_count == 5: 
                sender(user_id, "\n---------------------\n", keyboard_end)  
                sender(user_id, "Подождите, загружаем фото...", keyboard_end)           
                photo_check(user_id, fin_string[:-24], keyboard_end, img)
                img = []
                fin_count = 0
                fin_string = ""
        if fin_string != '':
            sender(user_id, "\n---------------------\n", keyboard_end) 
            sender(user_id, "Подождите, загружаем фото...", keyboard_end)
            fin_string = fin_string[:-24]
            photo_check(user_id, fin_string, keyboard_end, img)
    else:
        sender(user_id, "Извините, таких девайсов нет(", keyboard_end)
    

            
def ispar(user_id):
    wb.active = 3
    sheet = wb.active

    res = {}
    arr = []

    # fin_str += f"{key} --> {res[key][0]}\n"
    # sheet["B"+str(b)].value
    for i in range(2, 600):
        if sheet["A" + str(i)].value != None:
            b = i+1
            # for b in range(i+1, i+20):
            while sheet["B" + str(b)].value != None:
                if str(sheet["B" + str(b)].value) != "Название":
                    if str(sheet["C" + str(b)].value).strip() == "Есть":
                        arr.append(f"{sheet['B'+str(b)].value} --> {sheet['D'+str(b)].value} РУБ")
                else:
                    break
                b += 1
            res[sheet["A" + str(i)].value] = arr
            arr = []

    fin_str = ""
    count = 0
    fin_count = 0
    img = []


    for key in res:   
        if(len(res[key]) > 0):
            count+=1
            fin_str += f"{key}\n"
            for i in res[key]:
                fin_str += f'•{i}\n'
                string_find = i.replace(" ","")
                index = string_find.find("-->")
                img.append(f"./img/{string_find[0:index]}.jpg")
                fin_count +=1
            fin_str += "\n---------------------\n"
            fin_str += "\n\n"
            if count == 2:
                # fin_str_arr.append(fin_str)
                sender(user_id, "\n---------------------\n", keyboard_end)  
                sender(user_id, "Подождите, загружаем фото...", keyboard_end)           
                photo_check(user_id, fin_str[:-24], keyboard_end, img)
                fin_str = ""
                count = 0
                img = []

    if(fin_str) != "":
        # fin_str_arr.append(fin_str)
        sender(user_id, "\n---------------------\n", keyboard_end)  
        sender(user_id, "Подождите, загружаем фото...", keyboard_end)           
        photo_check(user_id, fin_str[:-24], keyboard_end, img)



def cartrige(user_id):
    wb.active = 3
    sheet = wb.active

    res = {}
    arr = []

    for i in range(2, 600):
        if sheet["G" + str(i)].value != None:
            b = i+1
            # for b in range(i+1, i+20):
            while sheet["H" + str(b)].value != None:
                if str(sheet["H" + str(b)].value) != "Название":
                    if str(sheet["I" + str(b)].value).strip() == "Есть":
                        arr.append(f"{sheet['H'+str(b)].value} --> {sheet['J'+str(b)].value} РУБ")
                else:
                    break
                b += 1
            res[sheet["G" + str(i)].value] = arr
            arr = []

    fin_str = ""
    count = 0
    fin_count = 0
    img = []


    for key in res:   
        if(len(res[key]) > 0):
            count+=1
            fin_str += f"{key}\n"
            for i in res[key]:
                fin_str += f'•{i}\n'
                string_find = i.replace(" ","")
                index = string_find.find("-->")
                img.append(f"./img/{string_find[0:index]}.jpg")
                fin_count +=1
            fin_str += "\n---------------------\n"
            fin_str += "\n\n"
            if count == 2:
                # fin_str_arr.append(fin_str)
                sender(user_id, "\n---------------------\n", keyboard_end)  
                sender(user_id, "Подождите, загружаем фото...", keyboard_end)           
                photo_check(user_id, fin_str[:-24], keyboard_end, img)
                fin_str = ""
                count = 0
                img = []

    if(fin_str) != "":
        # fin_str_arr.append(fin_str)
        sender(user_id, "\n---------------------\n", keyboard_end)  
        sender(user_id, "Подождите, загружаем фото...", keyboard_end)           
        photo_check(user_id, fin_str[:-24], keyboard_end, img)




for event in longpool.listen():
    if event.type == VkEventType.MESSAGE_NEW:
        if event.to_me:
            text = event.text.lower()
            user_id = event.user_id
            
            if text == "жидкости":
                zizha_choice(user_id)

            elif text == "20mg hard":
                zizha_hard(user_id)

            elif text == "20mg":
                zizha_lite(user_id)

            elif text == "любая":
                all_zizha(user_id)

            elif text == "одноразовые устройства":
                disposable(user_id)
            
            elif text == "девайсы":
                device(user_id)

            elif text == "комплектующие":
                complect_choice(user_id)

            elif text == "испарители":
                ispar(user_id)
            
            elif text == "картриджи":
                cartrige(user_id)
            
            elif text == 'в начало':
                sender(user_id, "Приветствую, я бот магазина PrimeVape. Я помогу вам соориентироваться в товарах, представленных в магазине. Для начала - выберите кнопку с интересующей вас позицией и продолжим!", keyboard)
            
            elif text == "пока":
                sender(user_id, "До скорых встреч!", keyboard)

            elif text:
                sender(user_id, "Приветствую, я бот магазина PrimeVape. Я помогу вам соориентироваться в товарах, представленных в магазине. Для начала - выберите кнопку с интересующей вас позицией и продолжим!", keyboard)