import React, {Component} from 'react';
import {PROFILSDADA as data} from './data'
import './avatar-list.css'

class AvatarList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: data,
            activeProfil: null,
            remainProfil: null
        };
    }

    componentDidMount() {
        this.setAvatarsData()
    }

    // adapt number of visible avatars to the window width
    setAvatarsData = () => {
        const windowWidth = window.innerWidth;

        if (windowWidth > 768){
            // substract to the the width of the viewport the margins of widget container and the width of the right section.
            let availableSpace = windowWidth - (200 + 200 + 60);

            // divide the remaining available space by the total space occupied by an avatar
            let avatarNub = availableSpace / 60;
            avatarNub = Math.round(avatarNub);

            this.setState({
                activeProfil: avatarNub,
                remainProfil: this.state.data.length - avatarNub
            })

        } else if (windowWidth > 500) {
            let availableSpace = windowWidth - 200;
            let avatarNub = availableSpace / 60;
            avatarNub = Math.round(avatarNub);

            this.setState({
                activeProfil: avatarNub,
                remainProfil: this.state.data.length - avatarNub
            })
        } else {
            let availableSpace = windowWidth - (50 + 100);
            let avatarNub = availableSpace / 60;
            avatarNub = Math.round(avatarNub);

            this.setState({
                activeProfil: avatarNub,
                remainProfil: this.state.data.length - avatarNub
            })
        }
    }

    render() {
        window.addEventListener('resize', this.setAvatarsData);
        let activeProfils = this.state.activeProfil
        return (
            <div className={"container"}>
                <div className="avatars__counter">
                    +{this.state.remainProfil}
                </div>
                <div className="avatars">
                    {this.state.data.map((el, id) => {
                        while (activeProfils > 0){
                            --activeProfils
                            return <Profil el={el} key={id}/>
                        }
                    })}
                </div>
            </div>
        );
    }
}

const Profil = ({el}) => (
    <div className="avatar">
        <div className="avatar__name"><span>{el.name}</span></div>
        <div className="avatar__picture"><img src={el.picture} alt="user photo"/></div>
    </div>
)

export default AvatarList;
