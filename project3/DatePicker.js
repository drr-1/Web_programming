"use strict";
class DatePicker {
    constructor(id,callback){
        this.id=id;
        this.callback=callback;
    }
    
    
    render(date, v){
        let calendar = document.getElementById(this.id);
        let table = document.createElement("table");

        calendar.appendChild(table);
        let head = table.createTHead();
        let header = head.insertRow(0);

        let leftarrow = header.insertCell(0);
        leftarrow.style.background="cadetblue url('leftA1.png') no-repeat left top";
        leftarrow.style.backgroundSize="20px 20px";
        // leftarrow.style.backgroundImage="url('l1.jpg')";
        leftarrow.style.color="black";

        leftarrow.addEventListener("click", () => {
            table.remove();
            date.setMonth(date.getMonth() - 1);
            console.log(date);
            this.render(date,true);
        });



        let calendarName = header.insertCell(1);
        calendarName.style.background="cadetblue";
        calendarName.style.color="black";
        let months = ["January", "February","March", "April","May", "June", "July", "August", "September",
        "October","November","December"];
        calendarName.innerHTML = months[date.getMonth()] + "   " + date.getFullYear();
        calendarName.colSpan = "5";



        let rightarrow = header.insertCell(2);
        rightarrow.style.background="cadetblue url('rightArrow.jpg') no-repeat left top";
        rightarrow.style.backgroundSize="20px 20px";

        rightarrow.style.color="black";

        rightarrow.addEventListener("click", () => {
            table.remove();
            date.setMonth(date.getMonth() + 1);
            console.log(date);
            this.render(date,true);
            document.getElementsByTagName("table")[0].setAttribute("id","table");
        });




        let weekdays = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
        let rowWeek = head.insertRow(1);
        for (let i = 0; i < 7; ++ i) {
            rowWeek.style.background="cadetblue";
            rowWeek.style.color="black";
            let cell = rowWeek.insertCell(i);
            cell.innerHTML = weekdays[i];
        }

        let firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        let curDate = new Date(firstDay.getTime());
        curDate.setDate(-firstDay.getDay() + 1);
        let rowIndex = 2;
        while (true) {
            let row = table.insertRow(rowIndex);
            rowIndex = rowIndex + 1;

            for (let i = 0; i < 7; ++ i) {
                let cell = row.insertCell(i);
                cell.innerHTML = curDate.getDate();
                if (curDate.getMonth() === date.getMonth()) {
                    let ob = {
                        month: curDate.getMonth() + 1,
                        day: cell.innerHTML,
                        year: curDate.getFullYear()
                    };
                    
                    if(curDate.getDate() === date.getDate() && !v){
                        cell.style.background = "brown";
                        cell.style.color = "white";
                    }
                
                    cell.addEventListener("click", () => {
                        
                        table.remove();
                        date.setDate(ob.day);
                        this.callback(this.id, ob);
                        this.render(date,false);
                    });
                

                } else {
                    cell.style.color="lightslategray";
                }

                curDate.setDate(curDate.getDate() + 1);
            }

            if (curDate.getMonth() !== date.getMonth()) {
                break;
            }
        }
    } 

}