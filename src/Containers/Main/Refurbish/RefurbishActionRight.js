import { Button } from 'antd'
import moment from 'moment';
import React from 'react'
import jsPDF from "jspdf";
import "jspdf-autotable";

const RefurbishActionRight = () => {
    const exportTemplateCMRPage = async () => {
        var doc = new jsPDF();

        var name1 = `HEADER 1 :`
        var name2 = `HEADER 2 :`
        var value = "4"
        var header = `Exemplar für
Copy for`

        doc.setFillColor(2, 179, 34);
        doc.rect(0, 0, 230, 16, 'F');
        doc.setFontSize(25);
        doc.text(value, 3, 10)
        doc.setFontSize(12);
        doc.text(header, 11, 6)

        doc.setFontSize(10);
        doc.setDrawColor(0, 255, 0)
        doc.rect(5, 16, 100, 30); // x, y, width, height //make box 2
        doc.text(name1, 30, 21);
        // doc.text("Content/Text of box -1", 8, 26);

        doc.setDrawColor(0, 255, 0)
        doc.rect(105, 16, 100, 30); ///make box 1
        doc.text(name2, 140, 21);
        // doc.text("Content/Text of box -2", 110, 26);


        doc.save(`CMR_template ${moment().format("L")}`);

    }
    const exportPDFCMRPage = async () => {
        var doc = new jsPDF();

        var name1 = `HEADER 1 :`
        var name2 = `HEADER 2 :`
        var name3 = `HEADER 3 :`
        var name4 = `HEADER 4 :`
        var name5 = `HEADER 5 :`
        var name6 = `HEADER 6 :`
        var name7A = `HEADER 7-A :`
        var name7B = `HEADER 7-B :`
        var name8 = `HEADER 8 :`
        var name9A = `HEADER 9A`
        var name9B = `HEADER 9B`
        var name9C = `HEADER 9C`
        var name9D = `HEADER 9D`
        var name10A = `HEADER 10A`
        var name10B = `HEADER 10B`
        var name10C = `HEADER 10C`
        var name11A = `HEADER 11A`
        var name11B = `HEADER 11B`
        var name11C = `HEADER 11C`
        var value = "4"
        var header = `Exemplar für
Copy for`

        doc.setFillColor(2, 179, 34);
        doc.rect(0, 0, 230, 16, 'F');
        doc.setFontSize(25);
        doc.text(value, 3, 10)
        doc.setFontSize(12);
        doc.text(header, 11, 6)

        //box-1
        doc.setFontSize(10);
        doc.setDrawColor(0, 255, 0)
        doc.rect(5, 16, 100, 30); // x, y, width, height //make box 2
        doc.text(name1, 30, 20);
        doc.text("Content/Text of box -1", 8, 26);
        //box-2
        doc.setDrawColor(0, 255, 0)
        doc.rect(105, 16, 100, 30); ///make box 1
        doc.text(name2, 140, 20);
        doc.text("Content/Text of box -2", 110, 26);

        //box-3
        doc.setFontSize(10);
        doc.setDrawColor(0, 255, 0)
        doc.rect(5, 46, 100, 30); // x, y, width, height //make box 2
        doc.text(name3, 30, 50);
        doc.text("Content/Text of box -3", 8, 56);
        // box 4
        doc.setDrawColor(0, 255, 0)
        doc.rect(105, 46, 100, 30); ///make box 1
        doc.text(name4, 140, 50);
        doc.text("Content/Text of box -4", 110, 56);
        //box -5
        doc.setFontSize(10);
        doc.setDrawColor(0, 255, 0)
        doc.rect(5, 76, 100, 30); // x, y, width, height //make box 2
        doc.text(name5, 30, 80);
        doc.text("Content/Text of box -5", 8, 86);
        //box -6
        doc.setDrawColor(0, 255, 0)
        doc.rect(105, 76, 100, 30); ///make box 1
        doc.text(name6, 140, 80);
        doc.text("Content/Text of box -6", 110, 86);
        // box -7A
        doc.setFontSize(10);
        doc.setDrawColor(0, 255, 0)
        doc.rect(5, 106, 100, 20); // x, y, width, height //make box 2
        doc.text(name7A, 30, 112);
        doc.text("Content/Text of box -7-A", 8, 117);
        // //box-7B
        doc.setFontSize(10);
        doc.setDrawColor(0, 255, 0)
        doc.rect(5, 106, 100, 38); // x, y, width, height //make box 2
        doc.text(name7B, 30, 130);
        doc.text("Content/Text of box -7-B", 8, 135);
        //box -8
        doc.setDrawColor(0, 255, 0)
        doc.rect(105, 106, 100, 38);
        doc.text(name8, 140, 110);
        doc.text("Content/Text of box -8", 110, 120);
        //box-9
        doc.setFontSize(10);
        doc.setDrawColor(0, 255, 0)
        doc.rect(5, 144, 115, 90); // x, y, width, height //make box 2
        doc.text(name9A, 7, 150);
        doc.text(name9B, 36, 150);
        doc.text(name9C, 63, 150);
        doc.text(name9D, 90, 150);
        // box-10
        doc.rect(120, 144, 28, 105);
        doc.rect(148, 144, 28, 105);
        doc.rect(176, 144, 29, 105);
        doc.text(name10A, 123, 150);
        doc.text(name10B, 152, 150);
        doc.text(name10C, 180, 150);
        // box-11
        doc.setDrawColor(0, 255, 0)
        doc.rect(5, 234, 115, 15);
        doc.text(name11A, 20, 238);
        doc.text(name11B, 50, 238);
        doc.text(name11C, 80, 238);
        // doc.text("box-9-A", 8, 135);

        doc.save(`CMR ${moment().format("L")}`);

    }
    return (
        <div style={{ display: "flex" }}>
            <Button type='primary' onClick={exportTemplateCMRPage}>Template</Button>
            <Button type="primary" onClick={exportPDFCMRPage}>CMR</Button>
        </div>
    )
}

export default RefurbishActionRight
