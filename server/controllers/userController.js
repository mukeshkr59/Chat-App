import User from '../models/User.js';
import bcrypt from 'bcryptjs';


// signup user
export const signup = async (req, res) => {
    const { fullName, email, password, bio } = req.body;
    try {
        if(!fullName || !email || !password || !bio) {
            return res.status(400).json({ success:false, message: 'All fields are required' });
        }
        const user = await User.findOne({ email }); 
        if(user) {
            return  res.status(409).json({ success:false, message: 'User already exists' });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = await User.create({
            fullName,
            email,
            password: hashedPassword,
            bio
        });

        const token = generateToken(newUser._id);

        return res.status(201).json({   
            success:true,
            message: 'User created successfully',   
            data: {
                user: {
                    id: newUser._id,
                    fullName: newUser.fullName,
                    email: newUser.email,
                    bio: newUser.bio,
                    profilePic: newUser.profilePic
                },
                token
            }
        });

        // const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, { expiresIn: '1d' });

        // return res.status(201).json({   
        //     success:true,
        //     message: 'User created successfully',
        //     data: {
        //         user: {
        //             id: newUser._id,
        //             fullName: newUser.fullName,
        //             email: newUser.email,
        //             bio: newUser.bio,
        //             profilePic: newUser.profilePic
        //         },
        //         token
        //     }
        // });

    } catch (err) {
        console.error('Error during user signup:', err.message);
        return res.status(500).json({ success:false, message: 'Server error during signup' });
    }
    // res.send("signup user");
}

// controller for login user

export const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        if(!email || !password) {
            return res.status(400).json({ success:false, message: 'All fields are required' });
        }   
        const user = await User.findOne({ email });
        if(!user) {
            return res.status(404).json({ success:false, message: 'User not found' });
        }   
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch) {
            return res.status(401).json({ success:false, message: 'Invalid credentials' });
        }
        const token = generateToken(user._id);

        return res.status(200).json({
            success:true,
            message: 'Login successful',
            data: {
                user: {
                    id: user._id,
                    fullName: user.fullName,    
                    email: user.email,
                    bio: user.bio,
                    profilePic: user.profilePic
                },
                token
            }
        });
    } catch (err) {
        console.error('Error during user login:', err.message);
        return res.status(500).json({ success:false, message: 'Server error during login' });
    }

    // res.send("login user");
}

// conrtroller to update user profile
export const updateProfile = async (req, res) => {
    try {
        const { fullName, bio, profilePic } = req.body;
        const userId = req.user._id;
        let updateUser;
        if(!profilePic) {
            updateUser = await User.findByIdAndUpdate(userId, {
                fullName,
                bio
            }, { new: true });
        } else {
            const upload = await cloudinary.uploader.upload(profilePic, {
                folder: 'profile_pics',
                width: 150,
                crop: 'scale'
            });
            updateUser = await User.findByIdAndUpdate(userId, {
                fullName,
                bio,    
                profilePic: upload.secure_url
            }, { new: true });
        }

        res.json({ success:true, message: 'Profile updated successfully', user: updateUser });
    } catch (error) {
        console.error('Error updating profile:', error.message);
        res.status(500).json({ success:false, message: 'Server error while updating profile' });
    }
}