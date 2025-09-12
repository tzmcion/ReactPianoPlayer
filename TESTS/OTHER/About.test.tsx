import { expect, it, describe} from "vitest";
import { render, screen } from '@testing-library/react';
import userEvent from "@testing-library/user-event";

import FAQ_component from "../../src/Pages/About/FAQ/FAQ.tsx";
import questions from "../../src/Utils/FAQ_questions";

describe("FAQ questions rendering",()=>{
    it("should render exact number of questions", () =>{
        render(<FAQ_component questions={questions}/>);
        expect(screen.getByTestId("FAQ_container_for_questions").children.length).toEqual(questions.length);
    });
    it("should change class on click", async () =>{
        render(<FAQ_component questions={questions}/>);
        const element = screen.getByTestId("FAQ_container_for_questions").children[0]
        await userEvent.click(element);
        expect(element.classList).toContain("FAQ_open");
    })
})