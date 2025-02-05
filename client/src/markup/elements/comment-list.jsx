import React, { Component } from 'react';
import { Link } from 'react-router-dom';

// Import Images
import testPic1 from "../../images/testimonials/pic1.jpg";
import testPic2 from "../../images/testimonials/pic2.jpg";

class CommentList extends Component{
	render(){
		return(
			<>
				<ol className="comment-list">
					<li className="comment">
						<div className="comment-body">
							<div className="comment-author vcard">
								<img className="avatar photo" src={testPic1} alt=""/>
								<div className="clearfix">
									<cite className="fn">George</cite> 
									<span className="says">says:</span>
									<div className="comment-meta"> <Link to="#">May 09, 2025 at 10:45 am</Link> </div>
								</div>
							</div>
							<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley.</p>
							<div className="reply"> <Link to="#" className="comment-reply-link">Reply</Link> </div>
						</div>
						<ol className="children">
							<li className="comment odd parent">
								<div className="comment-body">
									<div className="comment-author vcard"> 
										<img className="avatar photo" src={testPic2} alt=""/> 
										<div className="clearfix">
											<cite className="fn">Falikaz</cite> 
											<span className="says">says:</span> 
											<div className="comment-meta"> <Link to="#">May 09, 2025 at 10:45 am</Link></div>
										</div>
									</div>
									<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley.</p>
									<div className="reply"> <Link to="#" className="comment-reply-link">Reply</Link></div>
								</div>
							</li>
						</ol>
					</li>
					<li className="comment">
						<div className="comment-body">
							<div className="comment-author vcard"> 
								<img className="avatar photo" src={testPic1} alt=""/> 
								<div className="clearfix">
									<cite className="fn">Sonar</cite> 
									<span className="says">says:</span> 
									<div className="comment-meta"> <Link to="#">May 09, 2025 at 10:45 am</Link> </div>
								</div>
							</div>
							<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley.</p>
							<div className="reply"> <Link to="#" className="comment-reply-link">Reply</Link> </div>
						</div>
					</li>
					<li className="comment">
						<div className="comment-body">
							<div className="comment-author vcard"> 
								<img className="avatar photo" src={testPic2} alt=""/> 
								<div className="clearfix">
									<cite className="fn">Michel</cite>
									<span className="says">says:</span>
									<div className="comment-meta"> <Link to="#">May 09, 2025 at 10:45 am</Link> </div>
								</div>
							</div>
							<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley.</p>
							<div className="reply"> <Link to="#" className="comment-reply-link">Reply</Link> </div>
						</div>
					</li>
				</ol>
				
			</>
		);
	}
}

export default CommentList;