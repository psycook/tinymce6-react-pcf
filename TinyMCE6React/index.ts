import { IInputs, IOutputs } from "./generated/ManifestTypes";
import SMCTinyMCE6Component, { ISMCTinyMCE6ComponentProps } from "./SMCTinyMCE6Component";
import * as React from "react";

export class TinyMCE6React implements ComponentFramework.ReactControl<IInputs, IOutputs> {
    private theComponent: ComponentFramework.ReactControl<IInputs, IOutputs>;
    private context: ComponentFramework.Context<IInputs>;
    private state: ComponentFramework.Dictionary;
    private notifyOutputChanged: () => void;

    // TinyMCE Editor Content
    private content: string;
    private action: string;

    /**
     * Empty constructor.
     */
    constructor() { }

    /**
     * Used to initialize the control instance. Controls can kick off remote server calls and other initialization actions here.
     * Data-set values are not initialized here, use updateView.
     * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to property names defined in the manifest, as well as utility functions.
     * @param notifyOutputChanged A callback method to alert the framework that the control has new outputs ready to be retrieved asynchronously.
     * @param state A piece of data that persists in one session for a single user. Can be set at any point in a controls life cycle by calling 'setControlState' in the Mode interface.
     */
    public init(
        context: ComponentFramework.Context<IInputs>,
        notifyOutputChanged: () => void,
        state: ComponentFramework.Dictionary
    ): void {
        this.notifyOutputChanged = notifyOutputChanged;
        this.context = context;
        this.state = state;
        this.context.mode.trackContainerResize(true);
    }

    /**
     * Called when any value in the property bag has changed. This includes field values, data-sets, global values such as container height and width, offline status, control metadata values such as label, visible, etc.
     * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to names defined in the manifest, as well as utility functions
     * @returns ReactElement root react element for the control
     */
    public updateView(context: ComponentFramework.Context<IInputs>): React.ReactElement {
        console.log(`updateView: called.`);
        const props: ISMCTinyMCE6ComponentProps = { 
            content: context.parameters.content.raw || "",
            height: context.mode.allocatedHeight,
            width: context.mode.allocatedWidth,
            apiKey: context.parameters.apiKey.raw || "",
            notifyChangeFunction: this.notifyChange,
        }
        return React.createElement(
            SMCTinyMCE6Component, props
        );
    }

    public notifyChange = (content: string) => {
        console.log(`notifyChange: called with ${content} & ${this.action}`);
        this.content = content;
        this.action = "notifyChange";
        this.notifyOutputChanged();
    }

    /**
     * It is called by the framework prior to a control receiving new data.
     * @returns an object based on nomenclature defined in manifest, expecting object[s] for property marked as “bound” or “output”
     */
    public getOutputs(): IOutputs {
        console.log(`getOutputs: content is ${this.content}`);
        return { 
            content: this.content,
            action: this.action
        };
    }

    /**
     * Called when the control is to be removed from the DOM tree. Controls should use this call for cleanup.
     * i.e. cancelling any pending remote calls, removing listeners, etc.
     */
    public destroy(): void {
        // Add code to cleanup control if necessary
    }
}
