import { PacketReader } from "../../crypto/protocol/PacketReader";
import { PacketWriter } from "../../crypto/protocol/PacketWriter";
import { Color } from "./Color";

export class EquipColor {

    private primary: Color;
    private secondary: Color;
    private tertiary: Color;
    private index: number;

    public constructor(primary: Color, secondary: Color, tertiary: Color, index: number) {
        this.primary = primary;
        this.secondary = secondary;
        this.tertiary = tertiary;
        this.index = index;
    }

    public static read(packet: PacketReader): EquipColor {
        const primary = Color.read(packet);
        const secondary = Color.read(packet);
        const tertiary = Color.read(packet);
        const index = packet.readInt();

        return new EquipColor(primary, secondary, tertiary, index);
    }

    public static write(packet: PacketWriter, equipColor: EquipColor): void {
        Color.write(packet, equipColor.primary);
        Color.write(packet, equipColor.secondary);
        Color.write(packet, equipColor.tertiary);
        packet.writeInt(equipColor.index);
    }
}
