import _Effect from "../_Effect"

/**
 * Blank Effect is used when user choose no effect
 * it imitates doing "nothing" and it is easier than having everywhere if(s)
 */
export default class Blank extends _Effect{
    //No need to import the constructor

    public create_effect(pos_x: number, pos_y: number, key_width: number): void {
        
    }

    public render_effect(): void {
        
    }

    public update_effect(): void {
        
    }
}